import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Sparkles, ArrowRight } from 'lucide-react'
import { useFavorites } from '../features/favorites/FavoritesContext'
import { useAuth } from '../features/auth/AuthContext'
import VehicleCard from '../features/vehicles/VehicleCard'
import { api } from '../services/api'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Favorites() {
  usePageTitle('My Favourites | TS SALES MART')
  const { favoriteIds, favoriteVehicles } = useFavorites()
  const { user } = useAuth()
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    if (favoriteIds.length === 0) {
      setVehicles([])
      setLoading(false)
      return
    }

    if (user && favoriteVehicles.length > 0) {
      setVehicles(favoriteVehicles)
      setLoading(false)
      return
    }

    // Load matching vehicles by IDs
    setLoading(true)
    api.get('/vehicles', { params: { ids: favoriteIds.join(','), limit: 50 } })
      .then((res) => {
        if (active) {
          setVehicles(res.data.data || [])
        }
      })
      .catch(() => {
        if (active) setVehicles([])
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [favoriteIds, user, favoriteVehicles])

  return (
    <div className="container-page py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <p className="eyebrow">Personal Showroom</p>
          <h1 className="section-title mt-1">Saved Favourites</h1>
          <p className="mt-1 text-sm text-muted">
            Keep track of cars and vans you are interested in.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="badge bg-brand/10 text-brand font-bold px-3 py-1 text-sm">
            {favoriteIds.length} {favoriteIds.length === 1 ? 'Vehicle' : 'Vehicles'} Saved
          </span>
        </div>
      </div>

      {!user && favoriteIds.length > 0 && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-red-100 bg-red-50/50 p-4 text-sm">
          <div className="flex items-center gap-3">
            <Sparkles className="shrink-0 text-brand" size={20} />
            <p className="text-gray-700">
              You are viewing favourites saved on this device. Sign in or register to sync your list across phone and PC.
            </p>
          </div>
          <Link to="/login" className="btn-dark !py-2 shrink-0 text-xs">
            Sign In / Register
          </Link>
        </div>
      )}

      <div className="mt-8">
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-96 animate-pulse rounded-2xl bg-surface" />
            ))}
          </div>
        ) : vehicles.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-surface/50 p-12 text-center max-w-2xl mx-auto my-8">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white shadow-sm text-brand mb-4">
              <Heart size={32} />
            </div>
            <h2 className="text-xl font-bold">Your Favourites List is Empty</h2>
            <p className="mt-2 text-sm text-muted max-w-md mx-auto">
              Browse our inventory of quality new and pre-owned cars and vans, then tap the heart icon on any vehicle to save it here.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/vehicles" className="btn-primary">
                Explore Available Vehicles <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-outline-dark">
                Contact Our Team
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((v) => (
              <VehicleCard key={v._id || v.id} vehicle={v} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
