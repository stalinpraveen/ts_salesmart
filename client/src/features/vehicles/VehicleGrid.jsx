import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Car, AlertCircle } from 'lucide-react'
import VehicleCard from './VehicleCard'
import { fetchVehicles } from './vehicleService'

export default function VehicleGrid({ params, emptyText = 'No vehicles are listed right now.' }) {
  const [state, setState] = useState({ status: 'loading', items: [] })
  const key = JSON.stringify(params)

  useEffect(() => {
    let active = true
    setState({ status: 'loading', items: [] })
    fetchVehicles(params)
      .then((res) => active && setState({ status: 'ok', items: res.data || res.items || [] }))
      .catch(() => active && setState({ status: 'error', items: [] }))
    return () => { active = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  if (state.status === 'loading')
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
        {[0, 1, 2].map((i) => <div key={i} className="h-96 animate-pulse rounded-2xl bg-surface" />)}
      </div>
    )

  if (state.status === 'error')
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-surface p-10 text-center">
        <AlertCircle className="mx-auto text-brand" />
        <p className="mt-3 font-semibold">Inventory is not available right now.</p>
        <p className="text-sm text-muted">The vehicle service is not connected yet. Please contact us for current stock.</p>
      </div>
    )

  if (!state.items.length)
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-surface p-10 text-center">
        <Car className="mx-auto text-brand" />
        <p className="mt-3 font-semibold">{emptyText}</p>
        <Link to="/contact" className="btn-primary mt-4">Ask About Available Vehicles</Link>
      </div>
    )

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {state.items.map((v) => <VehicleCard key={v._id || v.id} vehicle={v} />)}
    </div>
  )
}
