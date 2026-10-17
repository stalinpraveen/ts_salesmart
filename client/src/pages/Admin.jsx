import { useCallback, useEffect, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import {
  Plus,
  Pencil,
  Archive,
  Car,
  Clock,
  CheckCircle2,
  AlertCircle,
  Inbox,
  ExternalLink,
  Phone,
  MessageSquare,
  Shield,
  Star,
  Search,
  Trash2,
} from 'lucide-react'
import { useAuth } from '../features/auth/AuthContext'
import VehicleForm from '../features/vehicles/VehicleForm'
import { api, errorMessage } from '../services/api'
import { formatLKR } from '../utils/format'
import { usePageTitle } from '../hooks/usePageTitle'
import { ASSETS } from '../utils/constants'

const TABS = [
  { id: 'Overview', label: 'Overview Metrics' },
  { id: 'Vehicles', label: 'Vehicle Inventory' },
  { id: 'Inquiries', label: 'Customer Inquiries' },
]

export default function Admin() {
  usePageTitle('Dealership Management Console | TS SALES MART')
  const { user, loading, isStaff } = useAuth()
  const [tab, setTab] = useState('Overview')

  if (loading) {
    return (
      <div className="container-page py-20 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent" />
        <p className="mt-3 text-sm text-neutral-500 font-semibold">Verifying staff credentials…</p>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  if (!isStaff) {
    return (
      <div className="container-page py-20 text-center max-w-md mx-auto">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-red-50 text-brand mb-4">
          <Shield size={32} />
        </div>
        <h1 className="font-display text-2xl font-extrabold uppercase">Access Denied</h1>
        <p className="mt-2 text-sm text-neutral-500">
          This management console is restricted to authorized TS SALES MART staff and dealership administrators.
        </p>
        <Link to="/" className="btn-primary mt-6 inline-flex">
          Return to Showroom
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f7f7f8] py-8">
      <div className="container-page">
        {/* Executive Management Header */}
        <div className="rounded-3xl border border-neutral-800 bg-[#09090b] text-white p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand">
                <Shield size={14} />
                <span>Executive Management Console</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
                Dealership Operations
              </h1>
              <p className="text-xs text-neutral-400">
                Logged in as <strong className="text-white">{user.name}</strong> ({user.email}) · Role: <span className="uppercase text-brand font-bold">{user.role}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/vehicles" target="_blank" className="btn-outline !py-2.5 !px-4 text-xs font-semibold">
                <ExternalLink size={14} /> View Live Showroom
              </Link>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-4" role="tablist">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                  tab === t.id
                    ? 'bg-brand text-white shadow-md'
                    : 'bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Panes */}
        <div className="mt-8">
          {tab === 'Overview' && <Overview setTab={setTab} />}
          {tab === 'Vehicles' && <Vehicles />}
          {tab === 'Inquiries' && <Inquiries />}
        </div>
      </div>
    </div>
  )
}

function Overview({ setTab }) {
  const [d, setD] = useState(null)
  const [err, setErr] = useState('')

  useEffect(() => {
    api
      .get('/admin/dashboard')
      .then((r) => setD(r.data.data))
      .catch((e) => setErr(errorMessage(e)))
  }, [])

  if (err) return <p className="text-brand font-semibold">{err}</p>
  if (!d) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 animate-pulse">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-32 rounded-2xl bg-neutral-200" />
        ))}
      </div>
    )
  }

  const statCards = [
    { label: 'Available in Showroom', value: d.vehicles.available || 0, icon: Car, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Reserved / Pending', value: d.vehicles.reserved || 0, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Sold Vehicles', value: d.vehicles.sold || 0, icon: CheckCircle2, color: 'text-neutral-600', bg: 'bg-neutral-100' },
    { label: 'Archived Listings', value: d.vehicles.archived || 0, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'New Inquiries', value: d.newInquiries || 0, icon: Inbox, color: 'text-brand', bg: 'bg-red-50' },
    { label: 'Total Inquiries', value: d.totalInquiries || 0, icon: MessageSquare, color: 'text-blue-600', bg: 'bg-blue-50' },
  ]

  return (
    <div className="space-y-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {statCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className={`grid h-10 w-10 place-items-center rounded-xl ${bg} ${color} mb-3`}>
              <Icon size={20} />
            </div>
            <p className="font-display text-3xl font-black text-neutral-900">{value}</p>
            <p className="text-xs font-semibold text-neutral-500 mt-1 leading-snug">{label}</p>
          </div>
        ))}
      </div>

      {/* Quick Launch Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <span className="badge bg-neutral-100 text-neutral-700 font-bold uppercase text-[10px]">Showroom Stock</span>
            <h3 className="font-display text-2xl font-bold uppercase mt-2">Vehicle Inventory Management</h3>
            <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
              Add new cars or vans, upload high-resolution photos, adjust prices, and toggle availability between Available, Reserved, Sold, or Archived.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-3">
            <button
              onClick={() => setTab('Vehicles')}
              className="btn-primary !py-2.5 text-xs font-bold"
            >
              Manage Vehicles
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <span className="badge bg-brand/10 text-brand font-bold uppercase text-[10px]">Customer Lead Desk</span>
            <h3 className="font-display text-2xl font-bold uppercase mt-2">Inquiries &amp; Customer Requests</h3>
            <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
              Review messages and contact requests from prospective buyers in Chunnakam and across Sri Lanka. One-click dial or WhatsApp reply.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-3">
            <button
              onClick={() => setTab('Inquiries')}
              className="btn-outline-dark !py-2.5 text-xs font-bold"
            >
              Review Inquiries ({d.newInquiries} New)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Vehicles() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [err, setErr] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  const load = useCallback(() => {
    setLoading(true)
    api
      .get('/admin/vehicles', { params: { limit: 100 } })
      .then((r) => setItems(r.data.data))
      .catch((e) => setErr(errorMessage(e)))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const act = async (fn) => {
    setErr('')
    try {
      await fn()
      load()
    } catch (e) {
      setErr(errorMessage(e))
    }
  }

  const setStatus = (v, status) => act(() => api.patch(`/admin/vehicles/${v._id}/status`, { status }))
  const toggleFeatured = (v) => act(() => api.patch(`/vehicles/${v._id}`, { featured: !v.featured }))
  const archive = (v) => {
    if (window.confirm(`Archive "${v.title}"? It will be hidden from the public website.`)) {
      act(() => api.delete(`/vehicles/${v._id}`))
    }
  }
  const removePermanent = (v) => {
    if (window.confirm(`Permanently delete "${v.title}"? This will remove it completely from the database.`)) {
      act(() => api.delete(`/vehicles/${v._id}/permanent`))
    }
  }

  if (editing) {
    return (
      <VehicleForm
        vehicle={editing._id ? editing : null}
        onCancel={() => setEditing(null)}
        onSaved={() => {
          setEditing(null)
          load()
        }}
      />
    )
  }

  const filteredItems = items.filter((v) => {
    if (!searchFilter.trim()) return true
    const q = searchFilter.toLowerCase()
    return (
      v.title?.toLowerCase().includes(q) ||
      v.brand?.toLowerCase().includes(q) ||
      v.model?.toLowerCase().includes(q) ||
      v.status?.toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-6">
      {/* Top Action & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => setEditing({})}
          className="btn-primary !py-3 !px-5 text-sm font-bold shadow-md shadow-red-950/20"
        >
          <Plus size={16} /> Add New Vehicle
        </button>

        <div className="relative flex items-center">
          <Search className="absolute left-3 text-neutral-400" size={16} />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search listed inventory…"
            className="rounded-xl border border-neutral-300 bg-white pl-9 pr-4 py-2 text-xs font-semibold text-neutral-800 focus:border-brand focus:outline-none"
          />
        </div>
      </div>

      {err && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-brand">
          {err}
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border border-neutral-200 bg-white p-12 text-center text-sm font-semibold text-neutral-500">
          Loading vehicle inventory…
        </div>
      ) : !items.length ? (
        <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-12 text-center max-w-md mx-auto">
          <Car size={36} className="mx-auto text-neutral-400 mb-3" />
          <h3 className="font-bold text-neutral-900">No Vehicles in Inventory Yet</h3>
          <p className="mt-1 text-xs text-neutral-500">Click the button below to publish your first vehicle listing.</p>
          <button onClick={() => setEditing({})} className="btn-primary mt-4">
            <Plus size={15} /> Add First Vehicle
          </button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-neutral-200 bg-neutral-50/70 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                <tr>
                  <th className="p-4">Vehicle</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Availability</th>
                  <th className="p-4 text-center">Featured</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredItems.map((v) => {
                  const thumb = v.images?.[0]?.url || ASSETS.logo
                  return (
                    <tr key={v._id} className="transition hover:bg-neutral-50/60">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={thumb}
                            alt=""
                            className="h-12 w-16 rounded-lg object-cover bg-neutral-100 shrink-0 border border-neutral-200"
                            onError={(e) => {
                              e.currentTarget.src = ASSETS.logo
                            }}
                          />
                          <div>
                            <Link
                              to={`/vehicles/${v._id}`}
                              target="_blank"
                              className="font-bold text-neutral-900 hover:text-brand transition flex items-center gap-1"
                            >
                              {v.title} <ExternalLink size={11} className="text-neutral-400" />
                            </Link>
                            <p className="text-xs text-neutral-500">
                              {v.year} · {v.brand} {v.model} · <span className="uppercase">{v.fuelType}</span>
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 font-display font-extrabold text-neutral-900">
                        {formatLKR(v.price)}
                      </td>

                      <td className="p-4">
                        <select
                          aria-label={`Status for ${v.title}`}
                          value={v.status}
                          onChange={(e) => setStatus(v, e.target.value)}
                          className={`rounded-xl border px-2.5 py-1 text-xs font-bold transition focus:outline-none ${
                            v.status === 'available'
                              ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                              : v.status === 'reserved'
                              ? 'border-amber-300 bg-amber-50 text-amber-800'
                              : v.status === 'sold'
                              ? 'border-neutral-300 bg-neutral-100 text-neutral-700'
                              : 'border-red-300 bg-red-50 text-red-800'
                          }`}
                        >
                          <option value="available">Available</option>
                          <option value="reserved">Reserved</option>
                          <option value="sold">Sold</option>
                          <option value="archived">Archived</option>
                        </select>
                      </td>

                      <td className="p-4 text-center">
                        <button
                          type="button"
                          onClick={() => toggleFeatured(v)}
                          aria-label={`Toggle featured for ${v.title}`}
                          className={`p-1.5 rounded-lg transition cursor-pointer ${
                            v.featured
                              ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                              : 'text-neutral-300 hover:text-neutral-500'
                          }`}
                        >
                          <Star size={18} className={v.featured ? 'fill-amber-500' : ''} />
                        </button>
                      </td>

                      <td className="p-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            aria-label={`Edit ${v.title}`}
                            onClick={() => setEditing(v)}
                            className="p-2 rounded-lg text-neutral-600 hover:text-brand hover:bg-neutral-100 transition cursor-pointer"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            aria-label={`Archive ${v.title}`}
                            title="Archive Vehicle"
                            onClick={() => archive(v)}
                            className="p-2 rounded-lg text-neutral-600 hover:text-amber-600 hover:bg-amber-50 transition cursor-pointer"
                          >
                            <Archive size={16} />
                          </button>
                          <button
                            aria-label={`Permanently delete ${v.title}`}
                            title="Delete Permanently"
                            onClick={() => removePermanent(v)}
                            className="p-2 rounded-lg text-neutral-600 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
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
    api
      .get('/admin/inquiries', { params: { limit: 100 } })
      .then((r) => setItems(r.data.data))
      .catch((e) => setErr(errorMessage(e)))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const setStatus = async (i, status) => {
    try {
      await api.patch(`/admin/inquiries/${i._id}`, { status })
      load()
    } catch (e) {
      setErr(errorMessage(e))
    }
  }

  if (loading) {
    return <div className="rounded-2xl border border-neutral-200 bg-white p-12 text-center text-sm font-semibold text-neutral-500">Loading inquiries…</div>
  }
  if (err) return <p className="text-brand font-semibold">{err}</p>
  if (!items.length) {
    return (
      <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-12 text-center max-w-md mx-auto">
        <Inbox size={36} className="mx-auto text-neutral-400 mb-3" />
        <h3 className="font-bold text-neutral-900">No Inquiries Received Yet</h3>
        <p className="mt-1 text-xs text-neutral-500">Customer leads from website visitors will appear here automatically.</p>
      </div>
    )
  }

  return (
    <ul className="space-y-4">
      {items.map((i) => {
        const rawPhone = i.phone.replace(/[^\d+]/g, '')
        const whatsappUrl = `https://wa.me/${rawPhone.replace('+', '')}?text=${encodeURIComponent(
          `Hello ${i.name}, thank you for contacting TS SALES MART regarding ${i.vehicle?.title || 'our vehicles'}.`
        )}`

        return (
          <li key={i._id} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-neutral-900">{i.name}</h3>
                  <span
                    className={`badge text-[10px] font-bold uppercase ${
                      i.status === 'new'
                        ? 'bg-red-50 text-brand border border-red-200'
                        : i.status === 'contacted'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    {i.status}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                  <a
                    href={`tel:${rawPhone}`}
                    className="inline-flex items-center gap-1 font-bold text-brand hover:underline"
                  >
                    <Phone size={13} /> {i.phone}
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-emerald-600 hover:underline"
                  >
                    <MessageSquare size={13} /> WhatsApp Customer
                  </a>
                  {i.email && <span className="text-neutral-500">Email: {i.email}</span>}
                </div>

                {i.vehicle && (
                  <p className="mt-2 text-xs font-semibold text-neutral-700">
                    Subject Vehicle: <strong className="text-neutral-900">{i.vehicle.title}</strong>
                  </p>
                )}
              </div>

              <select
                aria-label="Inquiry status"
                value={i.status}
                onChange={(e) => setStatus(i, e.target.value)}
                className="rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-xs font-bold text-neutral-800 focus:border-brand focus:outline-none"
              >
                <option value="new">Status: New Lead</option>
                <option value="contacted">Status: Contacted</option>
                <option value="closed">Status: Closed</option>
              </select>
            </div>

            <div className="mt-4 rounded-xl bg-neutral-50 p-4 border border-neutral-100">
              <p className="whitespace-pre-line text-xs sm:text-sm text-neutral-800 leading-relaxed font-normal">
                {i.message}
              </p>
            </div>

            <p className="mt-3 text-[11px] text-neutral-400">
              Received on {new Date(i.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
            </p>
          </li>
        )
      })}
    </ul>
  )
}
