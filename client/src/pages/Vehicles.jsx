import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchVehicles } from '../features/vehicles/vehicleService'
import VehicleCard from '../features/vehicles/VehicleCard'
import { usePageTitle } from '../hooks/usePageTitle'

const FILTERS = ['q', 'type', 'category', 'brand', 'model', 'minPrice', 'maxPrice', 'year', 'fuelType', 'condition', 'location', 'sort']

export default function Vehicles() {
  usePageTitle('Cars & Vans for Sale | TS SALES MART')
  const [sp, setSp] = useSearchParams()
  const [state, setState] = useState({ status: 'loading', items: [], pagination: null })
  const page = Number(sp.get('page')) || 1
  const qs = sp.toString()

  useEffect(() => {
    let active = true
    const params = Object.fromEntries(FILTERS.filter((k) => sp.get(k)).map((k) => [k, sp.get(k)]))
    fetchVehicles({ ...params, page, limit: 12 })
      .then((r) => active && setState({ status: 'ok', items: r.data, pagination: r.pagination }))
      .catch((e) => active && setState({ status: 'error', items: [], pagination: null, msg: e.response?.data?.message }))
    return () => { active = false }
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
  const goPage = (p) => { const n = new URLSearchParams(sp); n.set('page', p); setSp(n) }
  const active = FILTERS.filter((k) => k !== 'sort' && sp.get(k))

  return (
    <div className="container-page py-10">
      <h1 className="section-title">Cars &amp; Vans</h1>
      <div className="mt-6 grid gap-3 rounded-2xl bg-surface p-4 sm:grid-cols-2 lg:grid-cols-5">
        <label className="text-xs font-semibold">Type
          <select className="field mt-1" value={sp.get('type') || ''} onChange={(e) => update('type', e.target.value)}>
            <option value="">All</option><option value="car">Car</option><option value="van">Van</option><option value="suv">SUV</option>
          </select></label>
        <label className="text-xs font-semibold">Condition
          <select className="field mt-1" value={sp.get('condition') || ''} onChange={(e) => update('condition', e.target.value)}>
            <option value="">All</option><option value="new">New</option><option value="used">Pre-owned</option>
          </select></label>
        <label className="text-xs font-semibold">Fuel
          <select className="field mt-1" value={sp.get('fuelType') || ''} onChange={(e) => update('fuelType', e.target.value)}>
            <option value="">Any</option><option>Petrol</option><option>Diesel</option><option>Hybrid</option><option>Electric</option>
          </select></label>
        <label className="text-xs font-semibold">Sort
          <select className="field mt-1" value={sp.get('sort') || 'newest'} onChange={(e) => update('sort', e.target.value)}>
            <option value="newest">Newest first</option><option value="price_asc">Price: low to high</option>
            <option value="price_desc">Price: high to low</option><option value="year_desc">Year: newest</option>
          </select></label>
        <button type="button" disabled={!active.length} onClick={() => setSp(new URLSearchParams())} className="btn-outline-dark self-end disabled:opacity-40">Clear filters ({active.length})</button>
      </div>

      <div className="mt-8" aria-live="polite">
        {state.status === 'loading' && <p className="text-muted">Loading vehicles…</p>}
        {state.status === 'error' && <p className="rounded-xl bg-surface p-6 text-center">{state.msg || 'Inventory is not available right now.'} Please call us on 077 205 6400.</p>}
        {state.status === 'ok' && !state.items.length && <p className="rounded-xl bg-surface p-10 text-center font-semibold">No vehicles match your search. Try clearing some filters.</p>}
        {state.status === 'ok' && !!state.items.length && (
          <>
            <p className="mb-4 text-sm text-muted">{state.pagination.total} vehicle{state.pagination.total === 1 ? '' : 's'} found</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{state.items.map((v) => <VehicleCard key={v._id} vehicle={v} />)}</div>
            {state.pagination.pages > 1 && (
              <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-4">
                <button disabled={page <= 1} onClick={() => goPage(page - 1)} className="btn-outline-dark disabled:opacity-40">Previous</button>
                <span className="text-sm">Page {page} of {state.pagination.pages}</span>
                <button disabled={page >= state.pagination.pages} onClick={() => goPage(page + 1)} className="btn-outline-dark disabled:opacity-40">Next</button>
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  )
}
