import test from 'node:test'
import assert from 'node:assert/strict'
import { listQuerySchema } from '../src/validators/vehicleValidators.js'
import { buildPublicFilter, buildSort } from '../src/utils/vehicleQuery.js'

test('defaults applied and strings coerced', () => {
  const q = listQuerySchema.parse({ minPrice: '1000000', year: '2024' })
  assert.equal(q.page, 1)
  assert.equal(q.limit, 12)
  assert.equal(q.minPrice, 1000000)
  assert.equal(q.year, 2024)
})

test('invalid query values are rejected', () => {
  assert.equal(listQuerySchema.safeParse({ limit: '1000' }).success, false)
  assert.equal(listQuerySchema.safeParse({ type: 'boat' }).success, false)
  assert.equal(listQuerySchema.safeParse({ minPrice: '-5' }).success, false)
})

test('fuel type is case-insensitive', () => {
  assert.equal(listQuerySchema.parse({ fuelType: 'hybrid' }).fuelType, 'Hybrid')
})

test('public filter only returns available vehicles', () => {
  assert.equal(buildPublicFilter(listQuerySchema.parse({})).status, 'available')
})

test('price range and regex escaping', () => {
  const f = buildPublicFilter(listQuerySchema.parse({ minPrice: '10', maxPrice: '20', q: '.*' }))
  assert.deepEqual(f.price, { $gte: 10, $lte: 20 })
  assert.equal(f.$or[0].title.source, '\\.\\*')
})

test('sort mapping falls back to newest', () => {
  assert.deepEqual(buildSort('price_asc'), { price: 1 })
  assert.deepEqual(buildSort('bogus'), { createdAt: -1 })
})
