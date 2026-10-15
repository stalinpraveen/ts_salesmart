import { useCallback, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Plus, Pencil, Archive } from 'lucide-react'
import { useAuth } from '../features/auth/AuthContext'
import VehicleForm from '../features/vehicles/VehicleForm'
import { api, errorMessage } from '../services/api'
import { formatLKR } from '../utils/format'
import { usePageTitle } from '../hooks/usePageTitle'

const TABS = ['Overview', 'Vehicles', 'Inquiries']

export default function Admin() {
  usePageTitle('Staff Dashboard | TS SALES MART')
  const { user, loading, isStaff } = useAuth()
  const [tab, setTab] = useState('Overview')
  if (loading) return <div className="container-page py-20 text-muted">Loading…</div>
  if (!user) return <Navigate to="/login" replace />
  if (!isStaff) return <div className="container-page py-20 text-center"><h1 className="section-title">Access denied</h1><p className="mt-2 text-muted">This area is for authorised dealership staff.</p></div>

  return (
    <div className="container-page py-10">
      <h1 className="section-title">Staff Dashboard</h1>
      <div className="mt-6 flex gap-2 border-b border-gray-200" role="tablist">
        {TABS.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
            className={`-mb-px border-b-2 px-4 py-2 text-sm font-semibold ${tab === t ? 'border-brand text-brand' : 'border-transparent text-muted'}`}>{t}</button>
        ))}
      </div>
      <div className="mt-6">
        {tab === 'Overview' && <Overview />}
        {tab === 'Vehicles' && <Vehicles />}
        {tab === 'Inquiries' && <Inquiries />}
      </div>
    </div>
  )
}

function Overview() {
  const [d, setD] = useState(null)
  const [err, setErr] = useState('')
  useEffect(() => { api.get('/admin/dashboard').then((r) => setD(r.data.data)).catch((e) => setErr(errorMessage(e))) }, [])
  if (err) return <p className="text-brand">{err}</p>
  if (!d) return <p className="text-muted">Loading…</p>
  const cards = [['Available', d.vehicles.available || 0], ['Reserved', d.vehicles.reserved || 0], ['Sold', d.vehicles.sold || 0], ['Archived', d.vehicles.archived || 0], ['New inquiries', d.newInquiries], ['All inquiries', d.totalInquiries]]
  return <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">{cards.map(([k, v]) => <div key={k} className="rounded-2xl border border-gray-200 p-5"><p className="text-3xl font-extrabold text-brand">{v}</p><p className="text-sm text-muted">{k}</p></div>)}</div>
}

function Vehicles() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // null | {} (new) | vehicle
  const [err, setErr] = useState('')

  const load = useCallback(() => {
    setLoading(true)
    api.get('/admin/vehicles', { params: { limit: 100 } })
      .then((r) => setItems(r.data.data)).catch((e) => setErr(errorMessage(e))).finally(() => setLoading(false))
  }, [])
  useEffect(() => { load() }, [load])

  const act = async (fn) => { setErr(''); try { await fn(); load() } catch (e) { setErr(errorMessage(e)) } }
  const setStatus = (v, status) => act(() => api.patch(`/admin/vehicles/${v._id}/status`, { status }))
  const toggleFeatured = (v) => act(() => api.patch(`/vehicles/${v._id}`, { featured: !v.featured }))
  const archive = (v) => window.confirm(`Archive "${v.title}"? It will be hidden from the public site.`) && act(() => api.delete(`/vehicles/${v._id}`))

  if (editing)
    return <VehicleForm vehicle={editing._id ? editing : null} onCancel={() => setEditing(null)} onSaved={() => { setEditing(null); load() }} />

  return (
    <div>
      <button onClick={() => setEditing({})} className="btn-primary"><Plus size={16} />Add Vehicle</button>
      {err && <p role="alert" className="mt-3 text-sm text-brand">{err}</p>}
      {loading ? <p className="mt-6 text-muted">Loading…</p> : !items.length ? <p className="mt-6 rounded-xl bg-surface p-8 text-center">No vehicles yet. Add your first vehicle.</p> : (
        <div className="mt-6 overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface text-xs uppercase text-muted"><tr><th className="p-3">Vehicle</th><th>Price</th><th>Status</th><th>Featured</th><th className="p-3 text-right">Actions</th></tr></thead>
            <tbody>{items.map((v) => (
              <tr key={v._id} className="border-t border-gray-100">
                <td className="p-3 font-semibold">{v.title}<span className="block text-xs font-normal text-muted">{v.year} · {v.brand} {v.model}</span></td>
                <td>{formatLKR(v.price)}</td>
                <td><select aria-label={`Status for ${v.title}`} value={v.status} onChange={(e) => setStatus(v, e.target.value)} className="rounded border border-gray-300 px-2 py-1">
                  {['available', 'reserved', 'sold', 'archived'].map((s) => <option key={s}>{s}</option>)}</select></td>
                <td><input type="checkbox" aria-label={`Feature ${v.title}`} checked={v.featured} onChange={() => toggleFeatured(v)} /></td>
                <td className="p-3 text-right"><button aria-label={`Edit ${v.title}`} onClick={() => setEditing(v)} className="p-2 hover:text-brand"><Pencil size={16} /></button>
                  <button aria-label={`Archive ${v.title}`} onClick={() => archive(v)} className="p-2 hover:text-brand"><Archive size={16} /></button></td>
              </tr>))}</tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function Inquiries() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState('')
  const load = useCallback(() => {
    api.get('/admin/inquiries', { params: { limit: 100 } }).then((r) => setItems(r.data.data)).catch((e) => setErr(errorMessage(e))).finally(() => setLoading(false))
  }, [])
  useEffect(() => { load() }, [load])
  const setStatus = async (i, status) => { try { await api.patch(`/admin/inquiries/${i._id}`, { status }); load() } catch (e) { setErr(errorMessage(e)) } }

  if (loading) return <p className="text-muted">Loading…</p>
  if (err) return <p className="text-brand">{err}</p>
  if (!items.length) return <p className="rounded-xl bg-surface p-8 text-center">No inquiries yet.</p>
  return (
    <ul className="space-y-3">
      {items.map((i) => (
        <li key={i._id} className="rounded-xl border border-gray-200 p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div><p className="font-semibold">{i.name} · <a className="text-brand" href={`tel:${i.phone.replace(/[^\d+]/g, '')}`}>{i.phone}</a></p>
              {i.email && <p className="text-sm text-muted">{i.email}</p>}
              {i.vehicle && <p className="text-sm">Re: {i.vehicle.title}</p>}</div>
            <select aria-label="Inquiry status" value={i.status} onChange={(e) => setStatus(i, e.target.value)} className="rounded border border-gray-300 px-2 py-1 text-sm">
              {['new', 'contacted', 'closed'].map((s) => <option key={s}>{s}</option>)}</select>
          </div>
          <p className="mt-2 whitespace-pre-line text-sm text-gray-700">{i.message}</p>
          <p className="mt-1 text-xs text-muted">{new Date(i.createdAt).toLocaleString()}</p>
        </li>
      ))}
    </ul>
  )
}
