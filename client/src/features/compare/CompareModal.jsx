import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X, ArrowRight, MessageCircle, Check, Minus } from 'lucide-react'
import { useCompare } from './CompareContext'
import { formatLKR, formatKm } from '../../utils/format'
import { ASSETS } from '../../utils/constants'

export default function CompareModal() {
  const { vehicles, removeFromCompare, clearCompare, isModalOpen, setIsModalOpen } = useCompare()

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isModalOpen])

  if (!isModalOpen || !vehicles.length) return null

  const rows = [
    { label: 'Price', render: (v) => <span className="font-black text-brand text-base">{formatLKR(v.price)}</span> },
    { label: 'Condition', render: (v) => <span className="capitalize font-semibold">{v.condition === 'new' ? 'Brand New' : 'Pre-Owned'}</span> },
    { label: 'Year', render: (v) => v.year },
    { label: 'Mileage', render: (v) => formatKm(v.mileage) },
    { label: 'Fuel Type', render: (v) => v.fuelType },
    { label: 'Transmission', render: (v) => v.transmission },
    { label: 'Engine Capacity', render: (v) => (v.engineCapacity ? `${v.engineCapacity} cc` : '—') },
    { label: 'Vehicle Type', render: (v) => <span className="capitalize">{v.type || 'Car'}</span> },
    { label: 'Seats', render: (v) => (v.seats ? `${v.seats} Seats` : '—') },
    { label: 'Location', render: (v) => v.location || 'Chunnakam' },
    { label: 'Status', render: (v) => <span className="capitalize text-emerald-600 font-bold">{v.status || 'Available'}</span> },
  ]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div className="relative flex max-h-[90vh] w-full max-w-5xl flex-col rounded-3xl bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-5 sm:p-6 bg-surface">
          <div>
            <h2 id="compare-modal-title" className="font-display text-2xl font-bold uppercase text-ink">
              Vehicle Comparison
            </h2>
            <p className="text-xs text-muted mt-0.5">
              Side-by-side specifications of your selected vehicles
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={clearCompare}
              className="text-xs font-semibold text-muted hover:text-brand transition cursor-pointer"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="rounded-full p-2 text-gray-500 hover:bg-gray-200 hover:text-ink transition cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Matrix */}
        <div className="flex-1 overflow-auto p-5 sm:p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr>
                  <th className="w-1/4 p-3 text-muted uppercase text-[11px] font-bold">Specification</th>
                  {vehicles.map((v) => {
                    const id = v._id || v.id
                    const img = v.images?.[0]?.url || ASSETS.logo
                    return (
                      <th key={id} className="w-1/4 p-3 align-top min-w-[200px]">
                        <div className="relative group">
                          <button
                            onClick={() => removeFromCompare(id)}
                            className="absolute -top-1 -right-1 z-10 rounded-full bg-black/60 p-1 text-white hover:bg-brand transition cursor-pointer"
                            title="Remove from comparison"
                          >
                            <X size={12} />
                          </button>
                          <div className="aspect-[4/3] overflow-hidden rounded-xl bg-surface border border-gray-200 mb-2">
                            <img
                              src={img}
                              alt={v.title}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = ASSETS.logo
                                e.currentTarget.className = 'h-full w-full object-contain p-2'
                              }}
                            />
                          </div>
                          <p className="font-bold text-ink leading-tight truncate">{v.title}</p>
                          <p className="text-[11px] text-muted">{v.brand} {v.model}</p>
                        </div>
                      </th>
                    )
                  })}
                  {Array.from({ length: 3 - vehicles.length }).map((_, i) => (
                    <th key={`empty-${i}`} className="w-1/4 p-3 align-middle min-w-[200px]">
                      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 p-6 text-center text-muted">
                        <span className="text-xs font-semibold">+ Add another vehicle</span>
                        <Link
                          to="/vehicles"
                          onClick={() => setIsModalOpen(false)}
                          className="mt-2 text-[11px] font-bold text-brand hover:underline"
                        >
                          Browse Showroom
                        </Link>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {rows.map((row) => (
                  <tr key={row.label} className="hover:bg-gray-50/50">
                    <td className="p-3 font-semibold text-gray-700 bg-surface/50">{row.label}</td>
                    {vehicles.map((v) => (
                      <td key={(v._id || v.id) + row.label} className="p-3">
                        {row.render(v)}
                      </td>
                    ))}
                    {Array.from({ length: 3 - vehicles.length }).map((_, i) => (
                      <td key={`empty-cell-${i}`} className="p-3 text-gray-300 text-center">
                        —
                      </td>
                    ))}
                  </tr>
                ))}
                {/* Actions row */}
                <tr>
                  <td className="p-3 font-semibold text-gray-700 bg-surface/50">Actions</td>
                  {vehicles.map((v) => {
                    const id = v._id || v.id
                    const waMsg = encodeURIComponent(
                      `Hello TS SALES MART, I am interested in comparing the ${v.title} listed at ${formatLKR(v.price)}.`
                    )
                    return (
                      <td key={`action-${id}`} className="p-3 space-y-2">
                        <Link
                          to={`/vehicles/${id}`}
                          onClick={() => setIsModalOpen(false)}
                          className="btn-dark w-full !py-2 text-xs text-center"
                        >
                          View Details
                        </Link>
                        <a
                          href={`https://wa.me/94772056400?text=${waMsg}`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-whatsapp w-full !py-2 text-xs flex items-center justify-center gap-1.5"
                        >
                          <MessageCircle size={14} /> WhatsApp
                        </a>
                      </td>
                    )
                  })}
                  {Array.from({ length: 3 - vehicles.length }).map((_, i) => (
                    <td key={`empty-action-${i}`} className="p-3" />
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
