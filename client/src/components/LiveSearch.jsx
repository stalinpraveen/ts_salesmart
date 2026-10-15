import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, X, Loader2, ArrowRight } from 'lucide-react'
import { api } from '../services/api'
import { formatLKR } from '../utils/format'
import { ASSETS } from '../utils/constants'

export default function LiveSearch({ onClose }) {
  const [q, setQ] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()
  const wrapperRef = useRef(null)

  useEffect(() => {
    if (!q.trim() || q.trim().length < 2) {
      setResults([])
      setLoading(false)
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await api.get('/vehicles', { params: { q: q.trim(), limit: 5 } })
        setResults(res.data.data || [])
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    }, 250)

    return () => clearTimeout(timer)
  }, [q])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        onClose?.()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (q.trim()) {
      navigate(`/vehicles?q=${encodeURIComponent(q.trim())}`)
      onClose?.()
    }
  }

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <Search size={16} className="absolute left-3.5 text-gray-400 pointer-events-none" />
        <input
          autoFocus
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search make or model (e.g. Raize, Wagon R, Hilux)..."
          aria-label="Search vehicles"
          className="field pl-9 pr-16 !py-2 text-xs sm:text-sm shadow-md border-gray-300"
        />
        <div className="absolute right-2 flex items-center gap-1">
          {loading && <Loader2 size={15} className="animate-spin text-brand mr-1" />}
          {q && (
            <button
              type="button"
              onClick={() => setQ('')}
              className="p-1 text-gray-400 hover:text-ink cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-ink cursor-pointer"
            title="Close search"
          >
            <X size={16} />
          </button>
        </div>
      </form>

      {/* Dropdown Results Box */}
      {q.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
          {loading ? (
            <div className="p-4 text-center text-xs text-muted">Searching showroom inventory...</div>
          ) : results.length > 0 ? (
            <div className="py-2">
              <p className="px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-muted">
                Matching Vehicles ({results.length})
              </p>
              <ul className="divide-y divide-gray-100">
                {results.map((v) => {
                  const img = v.images?.[0]?.url || ASSETS.logo
                  return (
                    <li key={v._id}>
                      <Link
                        to={`/vehicles/${v._id}`}
                        onClick={onClose}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface transition"
                      >
                        <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-surface border border-gray-200">
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
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-ink truncate">{v.title}</p>
                          <p className="text-[11px] text-muted">
                            {v.year} · {v.transmission} · {v.fuelType}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs font-black text-brand">{formatLKR(v.price)}</p>
                          <span className="text-[10px] text-emerald-600 font-semibold uppercase">
                            {v.status || 'Available'}
                          </span>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
              <div className="border-t border-gray-100 p-2 text-center bg-surface">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline cursor-pointer"
                >
                  View all matching vehicles <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-xs font-medium text-gray-700">No vehicles matching &ldquo;{q}&rdquo;</p>
              <p className="text-[11px] text-muted mt-1">
                Try searching for Toyota, Suzuki, Raize, Wagon R, or view all vehicles.
              </p>
              <Link
                to="/vehicles"
                onClick={onClose}
                className="mt-3 inline-block rounded-xl bg-surface border border-gray-200 px-3 py-1.5 text-xs font-bold text-brand hover:border-brand"
              >
                Browse Full Catalog
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
