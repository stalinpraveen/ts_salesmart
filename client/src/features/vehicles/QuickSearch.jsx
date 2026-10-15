import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

const YEARS = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() + 1 - i)

export default function QuickSearch() {
  const navigate = useNavigate()
  const [f, setF] = useState({ type: '', brand: '', model: '', minPrice: '', maxPrice: '', year: '', fuelType: '', location: '' })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const p = new URLSearchParams()
    Object.entries(f).forEach(([k, v]) => v && p.set(k, v))
    navigate(`/vehicles?${p.toString()}`)
  }

  return (
    <form onSubmit={submit} aria-label="Quick vehicle search" className="relative z-10 -mt-12 rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl sm:p-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="text-xs font-semibold">Vehicle type
          <select className="field mt-1" value={f.type} onChange={set('type')}>
            <option value="">Car or van</option><option value="car">Car</option><option value="van">Van</option><option value="suv">SUV</option>
          </select>
        </label>
        <label className="text-xs font-semibold">Brand
          <input className="field mt-1" placeholder="e.g. Toyota" value={f.brand} onChange={set('brand')} />
        </label>
        <label className="text-xs font-semibold">Model
          <input className="field mt-1" placeholder="e.g. Raize" value={f.model} onChange={set('model')} />
        </label>
        <label className="text-xs font-semibold">Manufacturing year
          <select className="field mt-1" value={f.year} onChange={set('year')}>
            <option value="">Any year</option>{YEARS.map((y) => <option key={y}>{y}</option>)}
          </select>
        </label>
        <label className="text-xs font-semibold">Min price (Rs.)
          <input type="number" min="0" className="field mt-1" value={f.minPrice} onChange={set('minPrice')} />
        </label>
        <label className="text-xs font-semibold">Max price (Rs.)
          <input type="number" min="0" className="field mt-1" value={f.maxPrice} onChange={set('maxPrice')} />
        </label>
        <label className="text-xs font-semibold">Fuel type
          <select className="field mt-1" value={f.fuelType} onChange={set('fuelType')}>
            <option value="">Any</option><option>Petrol</option><option>Diesel</option><option>Hybrid</option><option>Electric</option>
          </select>
        </label>
        <label className="text-xs font-semibold">Location
          <input className="field mt-1" placeholder="e.g. Chunnakam" value={f.location} onChange={set('location')} />
        </label>
      </div>
      <button type="submit" className="btn-primary mt-4 w-full sm:w-auto"><Search size={16} />Search Vehicles</button>
    </form>
  )
}
