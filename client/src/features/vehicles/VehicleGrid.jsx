import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Car, AlertCircle } from 'lucide-react'
import VehicleCard from './VehicleCard'
import { fetchVehicles } from './vehicleService'

export default function VehicleGrid({ params, emptyText = 'No vehicles are listed right now.' }) {
  const [state, setState] = useState({ status: 'loading', items: [] })
  const [retryCount, setRetryCount] = useState(0)
  const key = JSON.stringify(params) + retryCount

  useEffect(() => {
    let active = true
    setState({ status: 'loading', items: [] })
    fetchVehicles(params)
      .then((res) => active && setState({ status: 'ok', items: res.data || res.items || [] }))
      .catch((err) => active && setState({ status: 'error', items: [], error: err }))
    return () => { active = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  if (state.status === 'loading')
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="rounded-3xl border border-neutral-200/90 bg-white p-5 shadow-sm space-y-4 overflow-hidden relative"
          >
            <div className="relative aspect-[16/10] w-full rounded-2xl bg-neutral-100 overflow-hidden">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-neutral-200/50 to-transparent animate-shimmer" />
            </div>
            <div className="h-4 w-3/4 rounded-lg bg-neutral-100 relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-neutral-200/50 to-transparent animate-shimmer" />
            </div>
            <div className="h-6 w-1/2 rounded-lg bg-neutral-100 relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-neutral-200/50 to-transparent animate-shimmer" />
            </div>
          </div>
        ))}
      </div>
    )

  if (state.status === 'error')
    return (
      <div className="rounded-3xl border border-neutral-200 bg-white p-8 sm:p-10 text-center shadow-sm max-w-xl mx-auto">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-red-50 text-brand mb-3">
          <AlertCircle size={28} />
        </div>
        <p className="font-display text-xl font-bold uppercase text-neutral-900">Inventory Connecting…</p>
        <p className="mt-1.5 text-xs sm:text-sm text-neutral-500 max-w-md mx-auto leading-relaxed">
          The cloud server might be waking up or your browser tab was opened before the server started.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setRetryCount((c) => c + 1)}
            className="btn-primary !py-2.5 !px-5 text-xs font-bold rounded-xl cursor-pointer shadow-md shadow-red-950/20"
          >
            Retry Connection
          </button>
          <Link to="/contact" className="btn-outline-dark !py-2.5 !px-5 text-xs font-semibold rounded-xl">
            Contact Showroom
          </Link>
        </div>
      </div>
    )

  if (!state.items.length)
    return (
      <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-10 text-center max-w-xl mx-auto shadow-sm">
        <Car className="mx-auto text-brand" size={32} />
        <p className="mt-3 font-display text-lg font-bold uppercase text-neutral-900">{emptyText}</p>
        <Link to="/contact" className="btn-primary mt-4 inline-flex">Ask About Available Vehicles</Link>
      </div>
    )

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {state.items.map((v) => <VehicleCard key={v._id || v.id} vehicle={v} />)}
    </div>
  )
}
