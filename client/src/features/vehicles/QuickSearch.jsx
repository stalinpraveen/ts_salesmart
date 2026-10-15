import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, RotateCcw, Car, Bus, Truck, Sparkles, MapPin, Fuel, Calendar, Banknote } from 'lucide-react'

const YEARS = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() + 1 - i)

const QUICK_TYPES = [
  { id: '', label: 'All Inventory', icon: Sparkles },
  { id: 'car', label: 'Cars', icon: Car },
  { id: 'passenger_van', label: 'Passenger Vans', icon: Bus, type: 'van', category: 'passenger' },
  { id: 'commercial_van', label: 'Commercial Vans', icon: Truck, type: 'van', category: 'commercial' },
  { id: 'suv', label: 'SUVs & Jeeps', icon: Car, type: 'suv' },
]

const PRICE_PRESETS = [
  { label: 'Under 5M', min: '', max: '5000000' },
  { label: '5M - 10M', min: '5000000', max: '10000000' },
  { label: '10M - 15M', min: '10000000', max: '15000000' },
  { label: '15M+', min: '15000000', max: '' },
]

export default function QuickSearch() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('')
  const [f, setF] = useState({
    type: '',
    category: '',
    brand: '',
    model: '',
    minPrice: '',
    maxPrice: '',
    year: '',
    fuelType: '',
    location: '',
  })

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const handleTabChange = (tab) => {
    setActiveTab(tab.id)
    if (tab.id === 'passenger_van') {
      setF((prev) => ({ ...prev, type: 'van', category: 'passenger' }))
    } else if (tab.id === 'commercial_van') {
      setF((prev) => ({ ...prev, type: 'van', category: 'commercial' }))
    } else {
      setF((prev) => ({ ...prev, type: tab.type || tab.id, category: '' }))
    }
  }

  const applyPricePreset = (min, max) => {
    setF((prev) => ({ ...prev, minPrice: min, maxPrice: max }))
  }

  const resetForm = () => {
    setActiveTab('')
    setF({
      type: '',
      category: '',
      brand: '',
      model: '',
      minPrice: '',
      maxPrice: '',
      year: '',
      fuelType: '',
      location: '',
    })
  }

  const submit = (e) => {
    e.preventDefault()
    const p = new URLSearchParams()
    Object.entries(f).forEach(([k, v]) => v && p.set(k, v))
    navigate(`/vehicles?${p.toString()}`)
  }

  return (
    <div className="relative z-20 -mt-10 sm:-mt-14 max-w-6xl mx-auto">
      {/* Type Selector Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 px-2 sm:px-0 scrollbar-none">
        {QUICK_TYPES.map((t) => {
          const Icon = t.icon
          const isSelected = activeTab === t.id
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => handleTabChange(t)}
              className={`flex items-center gap-2 rounded-t-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap shadow-xs ${
                isSelected
                  ? 'bg-white text-brand border-t-2 border-brand shadow-md'
                  : 'bg-neutral-900/90 hover:bg-neutral-800 text-gray-300'
              }`}
            >
              <Icon size={15} />
              <span>{t.label}</span>
            </button>
          )
        })}
      </div>

      {/* Main Search Panel */}
      <form
        onSubmit={submit}
        aria-label="Quick vehicle search"
        className="rounded-b-2xl rounded-tr-2xl border border-gray-200/90 bg-white p-5 sm:p-7 shadow-2xl backdrop-blur-sm"
      >
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
              <Car size={13} className="text-brand" /> Brand / Make
            </label>
            <input
              className="field mt-1.5"
              placeholder="e.g. Toyota, Suzuki, Nissan"
              value={f.brand}
              onChange={set('brand')}
            />
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
              <Sparkles size={13} className="text-brand" /> Model
            </label>
            <input
              className="field mt-1.5"
              placeholder="e.g. Raize, Wagon R, HiAce"
              value={f.model}
              onChange={set('model')}
            />
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
              <Calendar size={13} className="text-brand" /> Year
            </label>
            <select className="field mt-1.5" value={f.year} onChange={set('year')}>
              <option value="">Any Year</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
              <Fuel size={13} className="text-brand" /> Fuel Type
            </label>
            <select className="field mt-1.5" value={f.fuelType} onChange={set('fuelType')}>
              <option value="">Any Fuel Type</option>
              <option>Petrol</option>
              <option>Diesel</option>
              <option>Hybrid</option>
              <option>Electric</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
              <Banknote size={13} className="text-brand" /> Min Price (LKR)
            </label>
            <input
              type="number"
              min="0"
              step="50000"
              placeholder="Min Rs."
              className="field mt-1.5"
              value={f.minPrice}
              onChange={set('minPrice')}
            />
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
              <Banknote size={13} className="text-brand" /> Max Price (LKR)
            </label>
            <input
              type="number"
              min="0"
              step="50000"
              placeholder="Max Rs."
              className="field mt-1.5"
              value={f.maxPrice}
              onChange={set('maxPrice')}
            />
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
              <MapPin size={13} className="text-brand" /> Showroom Location
            </label>
            <input
              className="field mt-1.5"
              placeholder="e.g. Chunnakam, Jaffna"
              value={f.location}
              onChange={set('location')}
            />
          </div>

          <div className="flex flex-col justify-end">
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1.5 hidden sm:block">
              Quick Budget
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {PRICE_PRESETS.slice(0, 2).map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => applyPricePreset(p.min, p.max)}
                  className={`text-[11px] py-2 px-1.5 rounded-lg border font-semibold transition ${
                    f.minPrice === p.min && f.maxPrice === p.max
                      ? 'border-brand bg-red-50 text-brand'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted font-medium">Popular Budgets:</span>
            {PRICE_PRESETS.slice(2).map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => applyPricePreset(p.min, p.max)}
                className={`text-xs py-1 px-2.5 rounded-md border font-medium transition cursor-pointer ${
                  f.minPrice === p.min && f.maxPrice === p.max
                    ? 'border-brand bg-red-50 text-brand'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-auto w-full sm:w-auto">
            <button
              type="button"
              onClick={resetForm}
              className="btn-outline-dark !py-2.5 text-xs flex-1 sm:flex-initial"
            >
              <RotateCcw size={14} /> Clear
            </button>
            <button
              type="submit"
              className="btn-primary !py-2.5 px-6 text-sm flex-1 sm:flex-initial"
            >
              <Search size={16} /> Search Vehicles
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
