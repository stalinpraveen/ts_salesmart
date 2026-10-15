// Integration tests. Run against a SEPARATE database (tssalesmart_test) using MONGODB_URI from .env.
process.env.MONGODB_DB = 'tssalesmart_test'
import test, { before, after } from 'node:test'
import assert from 'node:assert/strict'
import mongoose from 'mongoose'
import { connectDB } from '../src/config/db.js'
import { createApp } from '../src/app.js'
import { User } from '../src/models/User.js'

let server, base
const jar = {}
const cookieHeader = (j) => Object.entries(j).map(([k, v]) => `${k}=${v}`).join('; ')

async function call(method, path, body, j = {}, extra = {}) {
  const res = await fetch(base + path, {
    method,
    headers: { 'content-type': 'application/json', cookie: cookieHeader(j), ...extra },
    body: body ? JSON.stringify(body) : undefined,
  })
  for (const c of res.headers.getSetCookie()) {
    const [kv] = c.split(';'); const i = kv.indexOf('=')
    j[kv.slice(0, i)] = kv.slice(i + 1)
  }
  return { status: res.status, json: await res.json().catch(() => ({})) }
}

const vehicle = {
  title: 'Test Toyota Raize', brand: 'Toyota', model: 'Raize', type: 'suv', year: 2024, price: 9500000,
  mileage: 1000, fuelType: 'Petrol', transmission: 'Automatic', condition: 'used',
}

before(async () => {
  await connectDB()
  await mongoose.connection.dropDatabase()
  server = createApp().listen(0)
  base = `http://localhost:${server.address().port}`
})
after(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.disconnect()
  server.close()
})

test('public cannot create vehicles or read admin data', async () => {
  assert.equal((await call('POST', '/api/vehicles', vehicle)).status, 401)
  assert.equal((await call('GET', '/api/admin/dashboard')).status, 401)
})

test('registration always creates a customer; customers are forbidden from staff routes', async () => {
  const r = await call('POST', '/api/auth/register', { name: 'Cust', email: 'c@example.com', password: 'password123', role: 'admin' }, jar)
  assert.equal(r.status, 201)
  assert.equal(r.json.data.role, 'customer')
  const csrf = { 'x-csrf-token': jar.csrf }
  assert.equal((await call('POST', '/api/vehicles', vehicle, jar, csrf)).status, 403)
  assert.equal((await call('GET', '/api/admin/dashboard', null, jar)).status, 403)
  assert.equal((await call('GET', '/api/auth/me', null, jar)).json.data.email, 'c@example.com')
})

test('login rejects wrong password with a generic message', async () => {
  const r = await call('POST', '/api/auth/login', { email: 'c@example.com', password: 'wrongwrong' })
  assert.equal(r.status, 401)
  assert.equal((await call('POST', '/api/auth/login', { email: 'nobody@example.com', password: 'wrongwrong' })).json.message, r.json.message)
})

test('staff can manage inventory; CSRF token required; public sees only available', async () => {
  await User.updateOne({ email: 'c@example.com' }, { role: 'staff' })
  const staff = {}
  await call('POST', '/api/auth/login', { email: 'c@example.com', password: 'password123' }, staff)
  const csrf = { 'x-csrf-token': staff.csrf }

  assert.equal((await call('POST', '/api/vehicles', vehicle, staff)).status, 403) // missing CSRF header
  const created = await call('POST', '/api/vehicles', vehicle, staff, csrf)
  assert.equal(created.status, 201)
  const id = created.json.data._id

  assert.equal((await call('POST', '/api/vehicles', { ...vehicle, status: 'sold', hack: 1 }, staff, csrf)).status, 400)

  let list = await call('GET', '/api/vehicles?brand=toyota&maxPrice=10000000')
  assert.equal(list.json.pagination.total, 1)
  assert.equal((await call('GET', `/api/vehicles/${id}`)).json.data.model, 'Raize')

  await call('PATCH', `/api/admin/vehicles/${id}/status`, { status: 'sold' }, staff, csrf)
  list = await call('GET', '/api/vehicles')
  assert.equal(list.json.pagination.total, 0)

  await call('PATCH', `/api/admin/vehicles/${id}/status`, { status: 'available' }, staff, csrf)
  await call('DELETE', `/api/vehicles/${id}`, null, staff, csrf)
  assert.equal((await call('GET', '/api/vehicles')).json.pagination.total, 0)
  assert.equal((await call('GET', `/api/vehicles/${id}`)).status, 404)
})

test('anyone can submit an inquiry; only staff can read them', async () => {
  const bad = await call('POST', '/api/inquiries', { name: 'A', phone: 'x', message: 'hi' })
  assert.equal(bad.status, 400)
  const ok = await call('POST', '/api/inquiries', { name: 'Kumar', phone: '077 205 6400', message: 'Is this still available?' })
  assert.equal(ok.status, 201)
  assert.equal((await call('GET', '/api/admin/inquiries')).status, 401)
  const staff = {}
  await call('POST', '/api/auth/login', { email: 'c@example.com', password: 'password123' }, staff)
  const list = await call('GET', '/api/admin/inquiries', null, staff)
  assert.equal(list.json.pagination.total, 1)
})

test('uploads: auth required, and only JPG/PNG/WebP accepted', async () => {
  const form = () => { const f = new FormData(); f.append('images', new Blob(['GIF89a'], { type: 'image/gif' }), 'x.gif'); return f }
  assert.equal((await fetch(base + '/api/admin/uploads', { method: 'POST', body: form() })).status, 401)
  const staff = {}
  await call('POST', '/api/auth/login', { email: 'c@example.com', password: 'password123' }, staff)
  const res = await fetch(base + '/api/admin/uploads', { method: 'POST', body: form(), headers: { cookie: cookieHeader(staff), 'x-csrf-token': staff.csrf } })
  assert.equal(res.status, 400)
  assert.match((await res.json()).message, /JPG, PNG or WebP/)
})
