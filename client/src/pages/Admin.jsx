import { useCallback, useEffect, useState, useMemo } from 'react'
import { Link, Navigate } from 'react-router-dom'
import {
  Plus,
  Pencil,
  Archive,
  Search,
  ExternalLink,
  MessageCircle,
  Phone,
  Mail,
  Car,
  Clock,
  CheckCircle2,
  AlertCircle,
  Inbox,
  Filter,
  Sparkles,
  RefreshCw,
  Eye,
} from 'lucide-react'
import { useAuth } from '../features/auth/AuthContext'
import VehicleForm from '../features/vehicles/VehicleForm'
import { api, errorMessage } from '../services/api'
import { formatLKR, formatLKRWords } from '../utils/format'
import { usePageTitle } from '../hooks/usePageTitle'
import { getShowroomStatus } from '../utils/showroomStatus'
import { ASSETS, BUSINESS } from '../utils/constants'

const TABS = ['Overview', 'Vehicles', 'Inquiries']

export default function Admin() {
  usePageTitle('Staff Dashboard | TS SALES MART')
  const { user, loading, isStaff } = useAuth()
  const [tab, setTab] = useState('Overview')

  if (loading) {
    return (
      <div className="container-page py-20 text-center">
        <div className="mx-auto h-10 w-10 rounded-full border-4 border-gray-200 border-t-brand animate-spin" />
        <p className="mt-3 text-sm text-muted">Loading staff session...</p>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  if (!isStaff) {
    return (
      <div className="container-page py-20 text-center max-w-md mx-auto">
        <h1 className="section-title">Access Restricted</h1>
        <p className="mt-2 text-sm text-muted">
          This management area is strictly for authorised TS SALES MART staff and administrators.
        </p>
        <Link to="/" className="btn-primary mt-6">
          Return to Showroom
        </Link>
      </div>
    )
  }

  return (
    <div className="container-page py-10">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <span className="eyebrow">Dealership Management</span>
          <h1 className="section-title mt-1">Staff Command Center</h1>
          <p className="text-xs sm:text-sm text-muted mt-1">
            Logged in as <strong>{user.name}</strong> ({user.email}) · Role: <span className="capitalize text-brand font-bold">{user.role}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="btn-outline-dark !py-2 text-xs flex items-center gap-1.5"
          >
            <Eye size={14} /> View Live Website
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mt-6 flex gap-2 border-b border-gray-200" role="tablist">
        {TABS.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 px-5 py-3 text-sm font-bold transition cursor-pointer ${
              tab === t
                ? 'border-brand text-brand'
                : 'border-transparent text-gray-500 hover:text-ink'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="mt-6">
        {tab === 'Overview' && <Overview onNavigateTab={setTab} />}
        {tab === 'Vehicles' && <Vehicles />}
        {tab === 'Inquiries' && <Inquiries />}
      </div>
    </div>
  )
}

/**
 * Overview Analytics & Quick Insights
 */
function Overview({ onNavigateTab }) {
  const [data, setData] = useState(null)
  const [err, setErr] = useState('')
  const showroomStatus = getShowroomStatus()

  useEffect(() => {
    api
      .get('/admin/dashboard')
      .then((r) => setData(r.data.data))
      .catch((e) => setErr(errorMessage(e)))
  }, [])

  if (err) return <p className="text-sm font-semibold text-brand">{err}</p>
  if (!data) {
    return (
      <div className="py-12 text-center text-sm text-muted">
        <div className="mx-auto h-8 w-8 rounded-full border-2 border-gray-300 border-t-brand animate-spin mb-2" />
        Loading dealership overview...
      </div>
    )
  }

  const statCards = [
    { label: 'Available Vehicles', value: data.vehicles.available || 0, icon: Car, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
    { label: 'Reserved Vehicles', value: data.vehicles.reserved || 0, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' },
    { label: 'Sold Vehicles', value: data.vehicles.sold || 0, icon: CheckCircle2, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' },
    { label: 'Archived / Hidden', value: data.vehicles.archived || 0, icon: Archive, color: 'text-gray-500', bg: 'bg-gray-50 border-gray-200' },
    { label: 'New Inquiries', value: data.newInquiries || 0, icon: AlertCircle, color: 'text-brand', bg: 'bg-red-50 border-red-200' },
    { label: 'Total Inquiries', value: data.totalInquiries || 0, icon: Inbox, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200' },
  ]

  return (
    <div className="space-y-8">
      {/* Key Metric Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {statCards.map((c) => {
          const Icon = c.icon
          return (
            <div
              key={c.label}
              className={`rounded-2xl border p-5 shadow-xs transition hover:shadow-md ${c.bg}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-700">{c.label}</span>
                <Icon size={18} className={c.color} />
              </div>
              <p className={`mt-3 text-3xl font-extrabold tracking-tight ${c.color}`}>
                {c.value}
              </p>
            </div>
          )
        })}
      </div>

      {/* Showroom Status & Quick Shortcuts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Chunnakam Status Banner */}
        <div className="rounded-3xl border border-gray-200 bg-surface p-6 sm:p-7">
          <div className="flex items-center justify-between">
            <span className="badge bg-white text-gray-800 border border-gray-200 font-bold">
              Showroom Real-Time Status
            </span>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${showroomStatus.statusClass}`}>
              <span className="h-2 w-2 rounded-full bg-current" />
              {showroomStatus.badgeText}
            </span>
          </div>

          <h3 className="font-display text-2xl font-bold uppercase mt-4 text-ink">
            Chunnakam Showroom
          </h3>
          <p className="mt-1 text-xs text-muted">
            {BUSINESS.address}
          </p>
          <p className="mt-3 text-xs text-gray-700 leading-relaxed">
            Operating Hours: <strong>{BUSINESS.hours}</strong>. Customer calls forwarded to{' '}
            {BUSINESS.phones.map((p) => p.display).join(' and ')}.
          </p>
        </div>

        {/* Quick Operational Actions */}
        <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-7 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-display text-xl font-bold uppercase text-ink">
              Quick Management Actions
            </h3>
            <p className="mt-1 text-xs text-muted">
              Add new cars or vans to the showroom inventory or review customer inquiries.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigateTab('Vehicles')}
              className="btn-primary !py-2.5 !px-4 text-xs font-bold"
            >
              <Plus size={15} /> Manage Vehicles
            </button>
            <button
              onClick={() => onNavigateTab('Inquiries')}
              className="btn-outline-dark !py-2.5 !px-4 text-xs font-bold"
            >
              <Inbox size={15} /> Review Customer Inquiries
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Vehicles Inventory Manager
 */
function Vehicles() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // null | {} (new) | vehicle
  const [err, setErr] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

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

  const setStatus = (v, status) =>
    act(() => api.patch(`/admin/vehicles/${v._id}/status`, { status }))

  const toggleFeatured = (v) =>
    act(() => api.patch(`/vehicles/${v._id}`, { featured: !v.featured }))

  const archive = (v) => {
    if (
      window.confirm(
        `Archive "${v.title}"? It will be removed from the public showroom.`
      )
    ) {
      act(() => api.delete(`/vehicles/${v._id}`))
    }
  }

  const filteredItems = useMemo(() => {
    return items.filter((v) => {
      const matchStatus = statusFilter === 'all' || v.status === statusFilter
      const text = `${v.title} ${v.brand} ${v.model} ${v.year}`.toLowerCase()
      const matchSearch = !searchTerm.trim() || text.includes(searchTerm.toLowerCase().trim())
      return matchStatus && matchSearch
    })
  }, [items, searchTerm, statusFilter])

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

  return (
    <div className="space-y-6">
      {/* Top Filter and Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface p-4 rounded-2xl border border-gray-200">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Add Vehicle Button */}
          <button
            onClick={() => setEditing({})}
            className="btn-primary !py-2.5 !px-4 text-xs font-bold whitespace-nowrap shadow-md cursor-pointer"
          >
            <Plus size={16} /> Add Vehicle
          </button>

          {/* Search bar inside admin table */}
          <div className="relative min-w-[200px] flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Filter inventory..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="field pl-8 !py-2 text-xs"
            />
          </div>

          {/* Status selector */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="field !w-auto !py-2 text-xs font-semibold"
          >
            <option value="all">All Statuses ({items.length})</option>
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="sold">Sold</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <button
          onClick={load}
          title="Refresh inventory"
          className="rounded-xl border border-gray-200 bg-white p-2.5 text-gray-600 hover:text-brand transition cursor-pointer self-end sm:self-auto"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {err && (
        <div role="alert" className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-brand font-medium">
          {err}
        </div>
      )}

      {loading ? (
        <div className="py-12 text-center text-sm text-muted">Loading showroom vehicles...</div>
      ) : !filteredItems.length ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-surface/50 p-12 text-center">
          <Car className="mx-auto text-brand mb-2" size={32} />
          <p className="font-bold text-sm text-ink">No vehicles matching your criteria.</p>
          <p className="text-xs text-muted mt-1">
            {items.length ? 'Try clearing your search or status filter.' : 'Click "Add Vehicle" to publish your first car or van.'}
          </p>
          {!items.length && (
            <button
              onClick={() => setEditing({})}
              className="btn-primary mt-4 !py-2 text-xs"
            >
              <Plus size={14} /> Add Vehicle Now
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-xs">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-surface text-[11px] font-bold uppercase tracking-wider text-muted border-b border-gray-200">
              <tr>
                <th className="p-3 sm:p-4">Vehicle</th>
                <th className="p-3 sm:p-4">Price (LKR)</th>
                <th className="p-3 sm:p-4">Mileage &amp; Fuel</th>
                <th className="p-3 sm:p-4">Status</th>
                <th className="p-3 sm:p-4 text-center">Featured</th>
                <th className="p-3 sm:p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredItems.map((v) => {
                const img = v.images?.[0]?.url || ASSETS.logo
                return (
                  <tr key={v._id} className="hover:bg-gray-50/60 transition">
                    {/* Vehicle Identity */}
                    <td className="p-3 sm:p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-16 shrink-0 overflow-hidden rounded-xl bg-surface border border-gray-200">
                          <img
                            src={img}
                            alt={v.title}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = ASSETS.logo
                              e.currentTarget.className = 'h-full w-full object-contain p-1'
                            }}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-ink leading-tight truncate">{v.title}</p>
                          <p className="text-[11px] text-muted mt-0.5">
                            {v.year} · {v.brand} {v.model} · <span className="capitalize">{v.type}</span>
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="p-3 sm:p-4 whitespace-nowrap">
                      <p className="font-black text-brand">{formatLKR(v.price)}</p>
                      <p className="text-[10px] text-gray-400 font-semibold">{formatLKRWords(v.price)}</p>
                    </td>

                    {/* Mileage & Fuel */}
                    <td className="p-3 sm:p-4 whitespace-nowrap text-muted text-xs">
                      <p>{v.mileage ? `${v.mileage} km` : '0 km'}</p>
                      <p className="text-[11px] text-gray-400">{v.fuelType} · {v.transmission}</p>
                    </td>

                    {/* Status Selector */}
                    <td className="p-3 sm:p-4 whitespace-nowrap">
                      <select
                        aria-label={`Status for ${v.title}`}
                        value={v.status}
                        onChange={(e) => setStatus(v, e.target.value)}
                        className={`rounded-lg border px-2.5 py-1 text-xs font-bold transition ${
                          v.status === 'available'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : v.status === 'reserved'
                            ? 'bg-amber-50 text-amber-700 border-amber-300'
                            : v.status === 'sold'
                            ? 'bg-red-50 text-red-700 border-red-300'
                            : 'bg-gray-100 text-gray-700 border-gray-300'
                        }`}
                      >
                        {['available', 'reserved', 'sold', 'archived'].map((s) => (
                          <option key={s} value={s}>
                            {s.toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Featured Checkbox */}
                    <td className="p-3 sm:p-4 text-center">
                      <button
                        type="button"
                        onClick={() => toggleFeatured(v)}
                        title={v.featured ? 'Remove from home showcase' : 'Show on home page'}
                        className={`p-1.5 rounded-lg transition cursor-pointer ${
                          v.featured ? 'text-amber-500 bg-amber-50' : 'text-gray-300 hover:text-gray-600'
                        }`}
                      >
                        <Sparkles size={16} className={v.featured ? 'fill-amber-400' : ''} />
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="p-3 sm:p-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to={`/vehicles/${v._id}`}
                          target="_blank"
                          rel="noreferrer"
                          title="View public listing"
                          className="rounded-lg p-2 text-gray-400 hover:text-ink hover:bg-gray-100 transition"
                        >
                          <ExternalLink size={15} />
                        </Link>
                        <button
                          onClick={() => setEditing(v)}
                          title="Edit vehicle"
                          aria-label={`Edit ${v.title}`}
                          className="rounded-lg p-2 text-gray-500 hover:text-brand hover:bg-red-50 transition cursor-pointer"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => archive(v)}
                          title="Archive / Remove vehicle"
                          aria-label={`Archive ${v.title}`}
                          className="rounded-lg p-2 text-gray-500 hover:text-brand hover:bg-red-50 transition cursor-pointer"
                        >
                          <Archive size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

/**
 * Inquiries Customer Inbox
 */
function Inquiries() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState('')
  const [filter, setFilter] = useState('all')

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

  const filteredItems = useMemo(() => {
    if (filter === 'all') return items
    return items.filter((i) => i.status === filter)
  }, [items, filter])

  if (loading) return <div className="py-12 text-center text-sm text-muted">Loading inquiries inbox...</div>
  if (err) return <p className="text-sm font-semibold text-brand">{err}</p>

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
        {['all', 'new', 'contacted', 'closed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold capitalize transition cursor-pointer ${
              filter === f
                ? 'bg-ink text-white'
                : 'bg-surface text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f} ({f === 'all' ? items.length : items.filter((i) => i.status === f).length})
          </button>
        ))}
      </div>

      {!filteredItems.length ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-surface/50 p-12 text-center">
          <Inbox className="mx-auto text-brand mb-2" size={32} />
          <p className="font-bold text-sm text-ink">No inquiries in this category.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {filteredItems.map((i) => {
            const cleanPhone = i.phone.replace(/[^\d+]/g, '')
            const waNumber = cleanPhone.startsWith('+') ? cleanPhone.slice(1) : cleanPhone.startsWith('0') ? `94${cleanPhone.slice(1)}` : cleanPhone
            const waMsg = encodeURIComponent(
              `Hello ${i.name}, this is TS SALES MART (Chunnakam, Sri Lanka) regarding your inquiry${
                i.vehicle ? ` on the ${i.vehicle.title}` : ''
              }. How can we assist you today?`
            )
            const waUrl = `https://wa.me/${waNumber}?text=${waMsg}`

            return (
              <li
                key={i._id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs transition hover:shadow-md"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-extrabold text-base text-ink">{i.name}</p>
                      <span
                        className={`badge text-[10px] uppercase font-bold ${
                          i.status === 'new'
                            ? 'bg-red-50 text-brand border border-red-200'
                            : i.status === 'contacted'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {i.status}
                      </span>
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-muted">
                      <span className="flex items-center gap-1 font-semibold text-gray-800">
                        <Phone size={13} className="text-brand" /> {i.phone}
                      </span>
                      {i.email && (
                        <span className="flex items-center gap-1">
                          <Mail size={13} className="text-gray-400" /> {i.email}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-[11px]">
                        <Clock size={12} className="text-gray-400" />
                        {new Date(i.createdAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Actions & Status Selector */}
                  <div className="flex items-center gap-2">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-whatsapp !py-1.5 !px-3 text-xs flex items-center gap-1 font-bold shadow-xs"
                    >
                      <MessageCircle size={14} /> WhatsApp
                    </a>

                    <a
                      href={`tel:${cleanPhone}`}
                      className="btn-outline-dark !py-1.5 !px-3 text-xs flex items-center gap-1 font-semibold"
                    >
                      <Phone size={13} /> Call
                    </a>

                    <select
                      aria-label="Inquiry status"
                      value={i.status}
                      onChange={(e) => setStatus(i, e.target.value)}
                      className="rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs font-semibold bg-white cursor-pointer"
                    >
                      {['new', 'contacted', 'closed'].map((s) => (
                        <option key={s} value={s}>
                          {s.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Referenced Vehicle Chip */}
                {i.vehicle && (
                  <div className="mt-3 inline-flex items-center gap-2 rounded-xl bg-surface px-3 py-1.5 text-xs text-gray-800 border border-gray-200">
                    <Car size={14} className="text-brand" />
                    <span>Inquiry Re: <strong>{i.vehicle.title}</strong></span>
                    {i.vehicle.price && (
                      <span className="text-brand font-bold">({formatLKR(i.vehicle.price)})</span>
                    )}
                  </div>
                )}

                {/* Customer Message Body */}
                <div className="mt-3 rounded-xl bg-surface/60 p-3.5 border border-gray-100 text-xs sm:text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                  {i.message}
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
