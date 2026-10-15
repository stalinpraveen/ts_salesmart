import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Car, Bus, Mountain, RotateCcw, Filter } from 'lucide-react'

const YEARS = Array.from({ length: 25 }, (_, i) => new Date().getFullYear() + 1 - i)

const TABS = [
  { id: '', label: 'All Inventory', icon: Filter },
  { id: 'car', label: 'Cars', icon: Car },
  { id: 'van', label: 'Vans', icon: Bus },
  { id: 'suv', label: 'SUVs', icon: Mountain },
]

export default function QuickSearch() {
  const navigate = useNavigate()
  const [f, setF] = useState({
    type: '',
    brand: '',
    model: '',
    minPrice: '',
    maxPrice: '',
    year: '',
    fuelType: '',
    location: '',
  })

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const setType = (type) => setF({ ...f, type })

  const hasFilters = Object.values(f).some(Boolean)

  const submit = (e) => {
    e.preventDefault()
    const p = new URLSearchParams()
    Object.entries(f).forEach(([k, v]) => v && p.set(k, v))
    navigate(`/vehicles?${p.toString()}`)
  }

  const reset = () => {
    setF({
      type: '',
      brand: '',
      model: '',
      minPrice: '',
      maxPrice: '',
      year: '',
      fuelType: '',
      location: '',
    })
  }

  return (
    <div className="relative z-20 -mt-10 sm:-mt-14">
      {/* Category Tabs Header */}
      <div className="flex items-center gap-1.5 pl-2 sm:pl-4 mb-1 overflow-x-auto no-scrollbar">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setType(id)}
            className={`flex items-center gap-1.5 rounded-t-xl px-4 py-2.5 text-xs font-bold transition-all duration-200 cursor-pointer shadow-sm ${
              f.type === id
                ? 'bg-white text-brand border-t-2 border-brand font-black shadow-md'
                : 'bg-neutral-900/80 text-gray-300 hover:text-white hover:bg-neutral-800'
            }`}
          >
            <Icon size={14} className={f.type === id ? 'text-brand' : 'text-gray-400'} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Main Console Box */}
      <form
        onSubmit={submit}
        aria-label="Quick vehicle search"
        className="rounded-3xl border border-neutral-200/90 bg-white p-6 sm:p-8 shadow-2xl shadow-black/10 backdrop-blur-md"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-500">
              Brand
            </label>
            <input
              className="field mt-1.5"
              placeholder="e.g. Toyota, Suzuki..."
              value={f.brand}
              onChange={set('brand')}
            />
          </div>

          <div>
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-500">
              Model
            </label>
            <input
              className="field mt-1.5"
              placeholder="e.g. Raize, Wagon R, HiAce..."
              value={f.model}
              onChange={set('model')}
            />
          </div>

          <div>
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-500">
              Manufacturing Year
            </label>
            <select className="field mt-1.5" value={f.year} onChange={set('year')}>
              <option value="">Any Year</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-500">
              Fuel Type
            </label>
            <select className="field mt-1.5" value={f.fuelType} onChange={set('fuelType')}>
              <option value="">Any Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-500">
              Min Price (LKR)
            </label>
            <input
              type="number"
              min="0"
              step="100000"
              placeholder="Min Price (Rs.)"
              className="field mt-1.5"
              value={f.minPrice}
              onChange={set('minPrice')}
            />
          </div>

          <div>
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-500">
              Max Price (LKR)
            </label>
            <input
              type="number"
              min="0"
              step="100000"
              placeholder="Max Price (Rs.)"
              className="field mt-1.5"
              value={f.maxPrice}
              onChange={set('maxPrice')}
            />
          </div>

          <div>
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-500">
              Vehicle Condition
            </label>
            <select className="field mt-1.5" value={f.condition || ''} onChange={set('condition')}>
              <option value="">All Conditions</option>
              <option value="new">Brand New</option>
              <option value="used">Pre-Owned</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-500">
              Location
            </label>
            <input
              className="field mt-1.5"
              placeholder="e.g. Chunnakam"
              value={f.location}
              onChange={set('location')}
            />
          </div>
        </div>

        {/* Action Row */}
        <div className="mt-6 pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            {hasFilters ? (
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 font-bold text-brand hover:underline cursor-pointer"
              >
                <RotateCcw size={12} /> Clear all search filters
              </button>
            ) : (
              <span>Filter by brand, budget, and vehicle type to discover matching cars and vans.</span>
            )}
          </div>

          <button type="submit" className="btn-primary w-full sm:w-auto px-8 !py-3 font-bold tracking-wide">
            <Search size={16} /> Search Vehicles
          </button>
        </div>
      </form>
    </div>
  )
}
