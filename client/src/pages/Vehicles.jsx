import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  Car,
  Bus,
  Mountain,
  Sparkles,
  Phone,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react'
import { fetchVehicles } from '../features/vehicles/vehicleService'
import VehicleCard from '../features/vehicles/VehicleCard'
import { usePageTitle } from '../hooks/usePageTitle'
import { BUSINESS } from '../utils/constants'

const FILTERS = [
  'q',
  'type',
  'category',
  'brand',
  'model',
  'minPrice',
  'maxPrice',
  'year',
  'fuelType',
  'transmission',
  'condition',
  'location',
  'sort',
]

const QUICK_TYPES = [
  { label: 'All Stock', value: '', icon: null },
  { label: 'Cars', value: 'car', icon: Car },
  { label: 'Vans', value: 'van', icon: Bus },
  { label: 'SUVs & Jeeps', value: 'suv', icon: Mountain },
]

const QUICK_CONDITIONS = [
  { label: 'All Conditions', value: '' },
  { label: 'Brand New', value: 'new' },
  { label: 'Pre-Owned', value: 'used' },
]

const POPULAR_SEARCHES = ['Raize', 'Wagon R', 'HiAce', 'Hilux', 'Vitz', 'Grace']

export default function Vehicles() {
  usePageTitle('Cars & Vans for Sale in Sri Lanka | TS SALES MART')
  const [sp, setSp] = useSearchParams()
  const [state, setState] = useState({ status: 'loading', items: [], pagination: null })
  const [searchInput, setSearchInput] = useState(sp.get('q') || '')
  const [showFilters, setShowFilters] = useState(false)

  const page = Number(sp.get('page')) || 1
  const qs = sp.toString()

  useEffect(() => {
    let active = true
    const params = Object.fromEntries(FILTERS.filter((k) => sp.get(k)).map((k) => [k, sp.get(k)]))
    setState((prev) => ({ ...prev, status: 'loading' }))

    fetchVehicles({ ...params, page, limit: 12 })
      .then((r) => {
        if (active) {
          setState({ status: 'ok', items: r.data, pagination: r.pagination })
        }
      })
      .catch((e) => {
        if (active) {
          setState({
            status: 'error',
            items: [],
            pagination: null,
            msg: e.response?.data?.message,
          })
        }
      })
    return () => {
      active = false
    }
  }, [qs, page, sp])

  const update = (k, v) => {
    const n = new URLSearchParams(sp)
    if (v) {
      n.set(k, v)
    } else {
      n.delete(k)
    }
    n.delete('page')
    setSp(n)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    update('q', searchInput.trim())
  }

  const clearAllFilters = () => {
    setSearchInput('')
    setSp(new URLSearchParams())
  }

  const goPage = (p) => {
    const n = new URLSearchParams(sp)
    n.set('page', p)
    setSp(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const activeFilters = FILTERS.filter((k) => k !== 'sort' && k !== 'page' && sp.get(k))

  return (
    <div className="min-h-screen bg-[#fcfcfd]">
      {/* Luxury Showroom Header Banner */}
      <section className="relative overflow-hidden bg-[#09090b] text-white pt-12 pb-16 border-b border-neutral-800">
        <div
          className="absolute -top-32 right-10 w-96 h-96 rounded-full bg-brand/15 blur-[100px] pointer-events-none"
          aria-hidden="true"
        />
        <div className="container-page relative z-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-gray-300 backdrop-blur-md">
              <Sparkles size={13} className="text-brand" />
              <span>TS SALES MART · OFFICIAL INVENTORY</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-none">
              Cars, Vans &amp; SUVs <br />
              <span className="text-brand">For Sale</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-300 max-w-xl font-normal leading-relaxed">
              Explore verified Japanese automobiles available now at our Chunnakam showroom. All vehicles are inspected for genuine condition, transparent mileage, and clear title documentation.
            </p>
          </div>

          {/* Quick Search Input */}
          <form onSubmit={handleSearchSubmit} className="mt-8 max-w-2xl">
            <div className="relative flex items-center rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 p-1.5 shadow-2xl focus-within:border-brand transition">
              <Search className="ml-3 text-gray-400 shrink-0" size={18} />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by make, model, year (e.g. Toyota Raize, Suzuki Wagon R)..."
                className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput('')
                    update('q', '')
                  }}
                  className="p-1.5 text-gray-400 hover:text-white cursor-pointer mr-1"
                  aria-label="Clear search input"
                >
                  <X size={15} />
                </button>
              )}
              <button
                type="submit"
                className="btn-primary !py-2.5 !px-5 text-xs font-bold rounded-xl shrink-0"
              >
                Search Stock
              </button>
            </div>

            {/* Popular quick searches */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-400">
              <span className="text-[11px] font-semibold text-gray-500">Popular:</span>
              {POPULAR_SEARCHES.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => {
                    setSearchInput(term)
                    update('q', term)
                  }}
                  className="rounded-lg bg-white/5 border border-white/10 px-2 py-0.5 text-gray-300 hover:text-white hover:border-brand transition cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </form>
        </div>
      </section>

      {/* Main Inventory Layout */}
      <div className="container-page py-10">
        {/* Top Control Bar: Category Pills & Condition Switcher */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-neutral-200 pb-6">
          {/* Vehicle Type Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {QUICK_TYPES.map(({ label, value, icon: Icon }) => {
              const isSelected = (sp.get('type') || '') === value
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => update('type', value)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-900 text-white shadow-md'
                      : 'bg-white border border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  {Icon && <Icon size={14} className={isSelected ? 'text-brand' : 'text-neutral-500'} />}
                  <span>{label}</span>
                </button>
              )
            })}
          </div>

          {/* Condition Pills & Filter Toggle */}
          <div className="flex flex-wrap items-center gap-2">
            {QUICK_CONDITIONS.map(({ label, value }) => {
              const isSelected = (sp.get('condition') || '') === value
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => update('condition', value)}
                  className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-brand text-white shadow-sm'
                      : 'bg-white border border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  {label}
                </button>
              )
            })}

            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold border transition cursor-pointer ${
                showFilters || activeFilters.length > 0
                  ? 'border-brand bg-red-50 text-brand'
                  : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <SlidersHorizontal size={14} />
              <span>Filters {activeFilters.length > 0 ? `(${activeFilters.length})` : ''}</span>
            </button>
          </div>
        </div>

        {/* Detailed Filter Drawer / Accordion */}
        {showFilters && (
          <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm animate-in fade-in duration-200">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Fuel Type
                </label>
                <select
                  className="field mt-1 font-medium"
                  value={sp.get('fuelType') || ''}
                  onChange={(e) => update('fuelType', e.target.value)}
                >
                  <option value="">Any Fuel Type</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Transmission
                </label>
                <select
                  className="field mt-1 font-medium"
                  value={sp.get('transmission') || ''}
                  onChange={(e) => update('transmission', e.target.value)}
                >
                  <option value="">Any Transmission</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Brand / Make
                </label>
                <select
                  className="field mt-1 font-medium"
                  value={sp.get('brand') || ''}
                  onChange={(e) => update('brand', e.target.value)}
                >
                  <option value="">All Brands</option>
                  <option value="Toyota">Toyota</option>
                  <option value="Suzuki">Suzuki</option>
                  <option value="Honda">Honda</option>
                  <option value="Nissan">Nissan</option>
                  <option value="Mitsubishi">Mitsubishi</option>
                  <option value="Daihatsu">Daihatsu</option>
                  <option value="Mazda">Mazda</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Van Category
                </label>
                <select
                  className="field mt-1 font-medium"
                  value={sp.get('category') || ''}
                  onChange={(e) => update('category', e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="passenger">Passenger Van</option>
                  <option value="commercial">Commercial Van</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Sort Order
                </label>
                <select
                  className="field mt-1 font-medium"
                  value={sp.get('sort') || 'newest'}
                  onChange={(e) => update('sort', e.target.value)}
                >
                  <option value="newest">Newest Listed First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="year_desc">Year: Newest First</option>
                </select>
              </div>
            </div>

            {activeFilters.length > 0 && (
              <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3">
                <span className="text-xs text-neutral-500">
                  {activeFilters.length} filter{activeFilters.length === 1 ? '' : 's'} active
                </span>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline cursor-pointer"
                >
                  <RotateCcw size={12} /> Reset all filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Active Filters Chips Bar */}
        {activeFilters.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-neutral-500">Active:</span>
            {activeFilters.map((key) => {
              const val = sp.get(key)
              return (
                <span
                  key={key}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-100 border border-neutral-200 px-2.5 py-1 text-xs font-semibold text-neutral-800"
                >
                  <span className="capitalize text-neutral-500">{key}:</span> {val}
                  <button
                    type="button"
                    onClick={() => update(key, '')}
                    className="text-neutral-400 hover:text-brand cursor-pointer"
                    aria-label={`Remove filter ${key}`}
                  >
                    <X size={12} />
                  </button>
                </span>
              )
            })}
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-xs font-bold text-brand hover:underline cursor-pointer ml-1"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Results Info & Count */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm font-semibold text-neutral-700">
            {state.status === 'ok' && (
              <>
                Showing <span className="font-extrabold text-brand">{state.pagination?.total || 0}</span> vehicles
              </>
            )}
          </p>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-xs font-semibold text-neutral-500 hidden sm:inline">
              Sort by:
            </label>
            <select
              id="sort-select"
              className="rounded-xl border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold text-neutral-800 focus:border-brand focus:outline-none"
              value={sp.get('sort') || 'newest'}
              onChange={(e) => update('sort', e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="year_desc">Year: Newest First</option>
            </select>
          </div>
        </div>

        {/* Main Grid or Loading / Empty States */}
        <div className="mt-6" aria-live="polite">
          {state.status === 'loading' && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm animate-pulse space-y-4"
                >
                  <div className="aspect-[16/10] w-full rounded-xl bg-neutral-200" />
                  <div className="h-4 w-3/4 rounded bg-neutral-200" />
                  <div className="h-6 w-1/2 rounded bg-neutral-200" />
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="h-4 rounded bg-neutral-100" />
                    <div className="h-4 rounded bg-neutral-100" />
                    <div className="h-4 rounded bg-neutral-100" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {state.status === 'error' && (
            <div className="rounded-3xl border border-neutral-200 bg-white p-12 text-center max-w-xl mx-auto shadow-sm">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-red-50 text-brand mb-4">
                <ShieldCheck size={28} />
              </div>
              <h2 className="text-xl font-bold text-neutral-900">Inventory Temporarily Unavailable</h2>
              <p className="mt-2 text-sm text-neutral-500">
                {state.msg || 'We could not load vehicles right now.'} Please reach out to our Chunnakam showroom directly:
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {BUSINESS.phones.map((p) => (
                  <a key={p.href} href={p.href} className="btn-primary">
                    <Phone size={15} /> Call {p.display}
                  </a>
                ))}
              </div>
            </div>
          )}

          {state.status === 'ok' && !state.items.length && (
            <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-12 text-center max-w-xl mx-auto my-6 shadow-sm">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-neutral-100 text-neutral-600 mb-4">
                <Filter size={26} />
              </div>
              <h2 className="text-xl font-bold text-neutral-900">No Vehicles Match Your Search</h2>
              <p className="mt-2 text-sm text-neutral-500 max-w-md mx-auto">
                We could not find any vehicle matching the selected criteria. Try removing some filters or search for another model.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button type="button" onClick={clearAllFilters} className="btn-primary">
                  <RotateCcw size={15} /> Reset All Filters
                </button>
                <Link to="/contact" className="btn-outline-dark">
                  Inquire by Telephone
                </Link>
              </div>
            </div>
          )}

          {state.status === 'ok' && !!state.items.length && (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {state.items.map((v) => (
                  <VehicleCard key={v._id || v.id} vehicle={v} />
                ))}
              </div>

              {/* Luxury Pagination */}
              {state.pagination.pages > 1 && (
                <nav
                  aria-label="Pagination"
                  className="mt-14 flex items-center justify-center gap-2 border-t border-neutral-200 pt-8"
                >
                  <button
                    disabled={page <= 1}
                    onClick={() => goPage(page - 1)}
                    className="inline-flex items-center gap-1 rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-xs font-bold text-neutral-700 hover:border-brand hover:text-brand disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft size={16} /> Previous
                  </button>

                  <div className="flex items-center gap-1 px-2">
                    {Array.from({ length: state.pagination.pages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => goPage(p)}
                        className={`grid h-9 w-9 place-items-center rounded-xl text-xs font-bold transition ${
                          p === page
                            ? 'bg-brand text-white shadow-md shadow-red-950/20'
                            : 'bg-white border border-neutral-200 text-neutral-700 hover:border-neutral-300'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  <button
                    disabled={page >= state.pagination.pages}
                    onClick={() => goPage(page + 1)}
                    className="inline-flex items-center gap-1 rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-xs font-bold text-neutral-700 hover:border-brand hover:text-brand disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
