import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, SlidersHorizontal, X, RotateCcw, Car, LayoutGrid, ListFilter, ArrowUpDown } from 'lucide-react'
import { fetchVehicles } from '../features/vehicles/vehicleService'
import VehicleCard from '../features/vehicles/VehicleCard'
import { usePageTitle } from '../hooks/usePageTitle'

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
  'condition',
  'location',
  'featured',
  'sort',
]

const YEARS = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() + 1 - i)

export default function Vehicles() {
  usePageTitle('Cars & Vans for Sale in Sri Lanka | TS SALES MART')
  const [sp, setSp] = useSearchParams()
  const [state, setState] = useState({ status: 'loading', items: [], pagination: null })
  const [showFilters, setShowFilters] = useState(false)
  const [layout, setLayout] = useState('grid')
  const page = Number(sp.get('page')) || 1
  const qs = sp.toString()

  useEffect(() => {
    let active = true
    const params = Object.fromEntries(FILTERS.filter((k) => sp.get(k)).map((k) => [k, sp.get(k)]))
    fetchVehicles({ ...params, page, limit: 12 })
      .then((r) => {
        if (active) setState({ status: 'ok', items: r.data, pagination: r.pagination })
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qs])

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

  const removeFilter = (k) => {
    const n = new URLSearchParams(sp)
    n.delete(k)
    n.delete('page')
    setSp(n)
  }

  const goPage = (p) => {
    const n = new URLSearchParams(sp)
    n.set('page', p)
    setSp(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const activeFilters = FILTERS.filter((k) => k !== 'sort' && sp.get(k))

  return (
    <div className="container-page py-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <p className="eyebrow">Dealership Stock</p>
          <h1 className="section-title mt-1">Cars &amp; Vans Showroom</h1>
          <p className="text-sm text-muted mt-1">
            Browse our inspected inventory of new and pre-owned automobiles in Sri Lanka.
          </p>
        </div>

        {/* Search bar inside header */}
        <div className="flex items-center gap-2 max-w-md w-full">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search make or model (e.g. Raize)..."
              value={sp.get('q') || ''}
              onChange={(e) => update('q', e.target.value)}
              className="field pl-9 !py-2 text-sm"
            />
            {sp.get('q') && (
              <button
                onClick={() => removeFilter('q')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-ink"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`btn !py-2 text-xs flex items-center gap-1.5 sm:hidden ${
              showFilters ? 'btn-primary' : 'btn-outline-dark'
            }`}
          >
            <SlidersHorizontal size={14} /> Filters {activeFilters.length > 0 && `(${activeFilters.length})`}
          </button>
        </div>
      </div>

      {/* Main Filter Bar */}
      <div
        className={`mt-6 rounded-2xl border border-gray-200/90 bg-surface p-5 transition-all duration-200 ${
          showFilters ? 'block' : 'hidden sm:block'
        }`}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted">Vehicle Type</label>
            <select
              className="field mt-1"
              value={sp.get('type') || ''}
              onChange={(e) => update('type', e.target.value)}
            >
              <option value="">All Types</option>
              <option value="car">Car</option>
              <option value="van">Van</option>
              <option value="suv">SUV</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted">Condition</label>
            <select
              className="field mt-1"
              value={sp.get('condition') || ''}
              onChange={(e) => update('condition', e.target.value)}
            >
              <option value="">All Conditions</option>
              <option value="new">Brand New</option>
              <option value="used">Pre-Owned</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted">Brand / Make</label>
            <input
              className="field mt-1"
              placeholder="e.g. Toyota"
              value={sp.get('brand') || ''}
              onChange={(e) => update('brand', e.target.value)}
            />
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted">Fuel Type</label>
            <select
              className="field mt-1"
              value={sp.get('fuelType') || ''}
              onChange={(e) => update('fuelType', e.target.value)}
            >
              <option value="">Any Fuel Type</option>
              <option>Petrol</option>
              <option>Diesel</option>
              <option>Hybrid</option>
              <option>Electric</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted">Manufacturing Year</label>
            <select
              className="field mt-1"
              value={sp.get('year') || ''}
              onChange={(e) => update('year', e.target.value)}
            >
              <option value="">Any Year</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted flex items-center gap-1">
              <ArrowUpDown size={11} className="text-brand" /> Sort By
            </label>
            <select
              className="field mt-1"
              value={sp.get('sort') || 'newest'}
              onChange={(e) => update('sort', e.target.value)}
            >
              <option value="newest">Newest Listed</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="year_desc">Year: Newest</option>
            </select>
          </div>
        </div>

        {/* Second Row for Van Category and Price Caps */}
        <div className="mt-3 pt-3 border-t border-gray-200/60 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 items-center">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted">Van Category</label>
            <select
              className="field mt-1"
              value={sp.get('category') || ''}
              onChange={(e) => update('category', e.target.value)}
            >
              <option value="">Any Van Type</option>
              <option value="passenger">Passenger Van</option>
              <option value="commercial">Commercial Van</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted">Max Price (LKR)</label>
            <input
              type="number"
              placeholder="e.g. 15000000"
              className="field mt-1"
              value={sp.get('maxPrice') || ''}
              onChange={(e) => update('maxPrice', e.target.value)}
            />
          </div>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-muted">Showroom Location</label>
            <input
              className="field mt-1"
              placeholder="e.g. Chunnakam"
              value={sp.get('location') || ''}
              onChange={(e) => update('location', e.target.value)}
            />
          </div>

          <div className="flex items-end justify-end h-full pt-4">
            <button
              type="button"
              disabled={!activeFilters.length}
              onClick={() => setSp(new URLSearchParams())}
              className="btn-outline-dark w-full !py-2.5 text-xs disabled:opacity-40"
            >
              <RotateCcw size={13} /> Reset All Filters ({activeFilters.length})
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips Bar */}
      {activeFilters.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted font-semibold">Active filters:</span>
          {activeFilters.map((k) => (
            <span
              key={k}
              className="inline-flex items-center gap-1 rounded-full bg-brand/10 text-brand px-3 py-1 text-xs font-semibold"
            >
              <span className="capitalize">{k}:</span> {sp.get(k)}
              <button
                type="button"
                onClick={() => removeFilter(k)}
                className="hover:text-ink cursor-pointer ml-1"
                aria-label={`Remove filter ${k}`}
              >
                <X size={12} />
              </button>
            </span>
          ))}
          <button
            onClick={() => setSp(new URLSearchParams())}
            className="text-xs text-muted hover:text-brand underline ml-2 cursor-pointer font-medium"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Results Section */}
      <div className="mt-8" aria-live="polite">
        {state.status === 'loading' && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-96 rounded-2xl bg-surface animate-pulse" />
            ))}
          </div>
        )}

        {state.status === 'error' && (
          <div className="rounded-2xl border border-gray-200 bg-surface p-10 text-center max-w-lg mx-auto">
            <p className="font-semibold text-lg text-ink">Inventory currently unavailable</p>
            <p className="mt-2 text-sm text-muted">
              {state.msg || 'We could not load the inventory right now. Please call us directly for current showroom stock.'}
            </p>
            <a href="tel:+94772056400" className="btn-primary mt-5">
              Call Showroom: 077 205 6400
            </a>
          </div>
        )}

        {state.status === 'ok' && !state.items.length && (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-surface/50 p-12 text-center max-w-xl mx-auto my-6">
            <Car className="mx-auto text-brand mb-3" size={32} />
            <h2 className="text-lg font-bold">No Vehicles Found Matching Your Search</h2>
            <p className="mt-2 text-sm text-muted">
              Try adjusting your filter options, clearing price caps, or search for different models.
            </p>
            <button
              onClick={() => setSp(new URLSearchParams())}
              className="btn-primary mt-6 text-xs"
            >
              Reset Filters &amp; View All Stock
            </button>
          </div>
        )}

        {state.status === 'ok' && !!state.items.length && (
          <>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-xs text-muted font-medium">
              <p>
                Showing <strong>{state.items.length}</strong> of <strong>{state.pagination.total}</strong> vehicle{state.pagination.total === 1 ? '' : 's'} in showroom
              </p>

              <div className="flex items-center gap-3">
                <span className="hidden sm:inline">Page {page} of {state.pagination.pages}</span>
                <div className="flex items-center gap-1 rounded-xl bg-surface border border-gray-200 p-1">
                  <button
                    type="button"
                    onClick={() => setLayout('grid')}
                    title="Grid View"
                    aria-label="Grid View"
                    className={`p-1.5 rounded-lg transition cursor-pointer ${
                      layout === 'grid'
                        ? 'bg-white text-brand shadow-xs'
                        : 'text-gray-500 hover:text-ink'
                    }`}
                  >
                    <LayoutGrid size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLayout('list')}
                    title="List View"
                    aria-label="List View"
                    className={`p-1.5 rounded-lg transition cursor-pointer ${
                      layout === 'list'
                        ? 'bg-white text-brand shadow-xs'
                        : 'text-gray-500 hover:text-ink'
                    }`}
                  >
                    <ListFilter size={15} />
                  </button>
                </div>
              </div>
            </div>

            <div className={layout === 'grid' ? 'grid gap-6 sm:grid-cols-2 lg:grid-cols-3' : 'flex flex-col gap-4'}>
              {state.items.map((v) => (
                <VehicleCard key={v._id || v.id} vehicle={v} layout={layout} />
              ))}
            </div>

            {state.pagination.pages > 1 && (
              <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-3">
                <button
                  disabled={page <= 1}
                  onClick={() => goPage(page - 1)}
                  className="btn-outline-dark !py-2 !px-4 text-xs disabled:opacity-40"
                >
                  ← Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: state.pagination.pages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => goPage(p)}
                      className={`h-9 w-9 rounded-lg text-xs font-bold transition ${
                        p === page
                          ? 'bg-brand text-white shadow-md'
                          : 'bg-surface hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <button
                  disabled={page >= state.pagination.pages}
                  onClick={() => goPage(page + 1)}
                  className="btn-outline-dark !py-2 !px-4 text-xs disabled:opacity-40"
                >
                  Next →
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  )
}
