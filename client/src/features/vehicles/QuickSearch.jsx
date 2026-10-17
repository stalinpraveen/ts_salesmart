import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Car, Sparkles, Tag, ShieldCheck, Headphones, CreditCard, ChevronDown } from 'lucide-react'

const YEARS = Array.from({ length: 25 }, (_, i) => new Date().getFullYear() + 1 - i)
const POPULAR_MAKES = ['Toyota', 'Suzuki', 'Honda', 'Nissan', 'BMW', 'Mercedes-Benz', 'Audi', 'Lexus']

export default function QuickSearch() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('all') // 'all' | 'new' | 'used'
  const [f, setF] = useState({
    brand: '',
    model: '',
    minYear: '',
    maxYear: '',
    minPrice: '',
    maxPrice: '',
  })

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const p = new URLSearchParams()
    if (tab === 'new') p.set('condition', 'new')
    if (tab === 'used') p.set('condition', 'used')
    if (f.brand) p.set('brand', f.brand)
    if (f.model) p.set('model', f.model)
    if (f.minYear) p.set('minYear', f.minYear)
    if (f.maxYear) p.set('maxYear', f.maxYear)
    if (f.minPrice) p.set('minPrice', f.minPrice)
    if (f.maxPrice) p.set('maxPrice', f.maxPrice)
    navigate(`/vehicles?${p.toString()}`)
  }

  return (
    <div className="relative z-20 -mt-10 sm:-mt-16 lg:-mt-20">
      {/* Search Console Container Matching Reference Design */}
      <div className="rounded-3xl border border-white/10 bg-[#121316]/95 p-5 sm:p-7 lg:p-8 shadow-2xl shadow-black/80 backdrop-blur-xl transition-all duration-300">
        {/* Top Type Switcher Tabs (All Vehicles, New Cars, Used Cars) */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar pb-1">
          <button
            type="button"
            onClick={() => setTab('all')}
            className={`flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2.5 text-xs font-bold transition-all duration-200 cursor-pointer shrink-0 active:scale-95 ${
              tab === 'all'
                ? 'bg-brand text-white shadow-md shadow-red-950/40 ring-1 ring-red-500/50'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Car size={15} />
            <span>All Vehicles</span>
          </button>

          <button
            type="button"
            onClick={() => setTab('new')}
            className={`flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2.5 text-xs font-bold transition-all duration-200 cursor-pointer shrink-0 active:scale-95 ${
              tab === 'new'
                ? 'bg-brand text-white shadow-md shadow-red-950/40 ring-1 ring-red-500/50'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Sparkles size={14} />
            <span>New Cars</span>
          </button>

          <button
            type="button"
            onClick={() => setTab('used')}
            className={`flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2.5 text-xs font-bold transition-all duration-200 cursor-pointer shrink-0 active:scale-95 ${
              tab === 'used'
                ? 'bg-brand text-white shadow-md shadow-red-950/40 ring-1 ring-red-500/50'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Tag size={14} />
            <span>Used Cars</span>
          </button>
        </div>

        {/* Inputs Row Matching Screenshot */}
        <form onSubmit={submit} className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-12 items-end">
          {/* Make Column */}
          <div className="lg:col-span-3">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Make
            </label>
            <div className="relative">
              <select
                value={f.brand}
                onChange={set('brand')}
                className="h-12 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 pr-8 text-xs font-semibold text-white focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition appearance-none cursor-pointer"
              >
                <option value="" className="bg-[#121316] text-white">Select Make</option>
                {POPULAR_MAKES.map((m) => (
                  <option key={m} value={m} className="bg-[#121316] text-white">{m}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Model Column */}
          <div className="lg:col-span-2">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Model
            </label>
            <input
              type="text"
              placeholder="e.g. Raize, HiAce"
              value={f.model}
              onChange={set('model')}
              className="h-12 w-full rounded-xl border border-white/15 bg-white/5 px-3.5 text-xs font-semibold text-white placeholder:text-gray-500 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none transition"
            />
          </div>

          {/* Year Column (Min Year - Max Year) */}
          <div className="lg:col-span-2">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Year
            </label>
            <div className="flex items-center gap-1.5">
              <select
                value={f.minYear}
                onChange={set('minYear')}
                className="h-12 w-1/2 rounded-xl border border-white/15 bg-white/5 px-2.5 text-xs font-semibold text-white focus:border-brand focus:outline-none transition appearance-none cursor-pointer"
              >
                <option value="" className="bg-[#121316] text-white">Min</option>
                {YEARS.map((y) => (
                  <option key={y} value={y} className="bg-[#121316] text-white">{y}</option>
                ))}
              </select>
              <span className="text-gray-500 text-xs shrink-0">-</span>
              <select
                value={f.maxYear}
                onChange={set('maxYear')}
                className="h-12 w-1/2 rounded-xl border border-white/15 bg-white/5 px-2.5 text-xs font-semibold text-white focus:border-brand focus:outline-none transition appearance-none cursor-pointer"
              >
                <option value="" className="bg-[#121316] text-white">Max</option>
                {YEARS.map((y) => (
                  <option key={y} value={y} className="bg-[#121316] text-white">{y}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Range Column (Min Price - Max Price) */}
          <div className="lg:col-span-3">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
              Price Range (LKR)
            </label>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                placeholder="Min Price"
                step="100000"
                value={f.minPrice}
                onChange={set('minPrice')}
                className="h-12 w-1/2 rounded-xl border border-white/15 bg-white/5 px-2.5 text-xs font-semibold text-white placeholder:text-gray-500 focus:border-brand focus:outline-none transition"
              />
              <span className="text-gray-500 text-xs shrink-0">-</span>
              <input
                type="number"
                placeholder="Max Price"
                step="100000"
                value={f.maxPrice}
                onChange={set('maxPrice')}
                className="h-12 w-1/2 rounded-xl border border-white/15 bg-white/5 px-2.5 text-xs font-semibold text-white placeholder:text-gray-500 focus:border-brand focus:outline-none transition"
              />
            </div>
          </div>

          {/* Red Search Button matching screenshot */}
          <div className="lg:col-span-2">
            <button
              type="submit"
              className="h-12 btn-primary w-full !px-4 text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-950/40 cursor-pointer"
            >
              <Search size={15} />
              <span>Search Stock</span>
            </button>
          </div>
        </form>

        {/* 4 Feature Badges Row from screenshot */}
        <div className="mt-7 pt-5 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 text-left">
          {/* Badge 1: Premium Vehicles */}
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-xl bg-red-950/40 text-brand border border-brand/20 shrink-0">
              <Car size={18} />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-extrabold text-white leading-tight">50+ Stock</p>
              <p className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5">Premium Vehicles</p>
            </div>
          </div>

          {/* Badge 2: Quality Guaranteed */}
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-xl bg-red-950/40 text-brand border border-brand/20 shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-extrabold text-white leading-tight">100% Verified</p>
              <p className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5">Quality Guaranteed</p>
            </div>
          </div>

          {/* Badge 3: Customer Support */}
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-xl bg-red-950/40 text-brand border border-brand/20 shrink-0">
              <Headphones size={18} />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-extrabold text-white leading-tight">Direct Hotline</p>
              <p className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5">Customer Support</p>
            </div>
          </div>

          {/* Badge 4: Easy Finance / Trade-In */}
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-xl bg-red-950/40 text-brand border border-brand/20 shrink-0">
              <CreditCard size={18} />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-extrabold text-white leading-tight">Easy Trade-In</p>
              <p className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5">Instant Appraisal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

