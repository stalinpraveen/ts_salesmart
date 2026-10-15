import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Sparkles, ArrowRight, ShieldCheck, Phone, MessageSquare } from 'lucide-react'
import { useFavorites } from '../features/favorites/FavoritesContext'
import { useAuth } from '../features/auth/AuthContext'
import VehicleCard from '../features/vehicles/VehicleCard'
import { api } from '../services/api'
import { usePageTitle } from '../hooks/usePageTitle'
import { BUSINESS } from '../utils/constants'

export default function Favorites() {
  usePageTitle('My Saved Showroom Favourites | TS SALES MART')
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

    setLoading(true)
    api
      .get('/vehicles', { params: { ids: favoriteIds.join(','), limit: 50 } })
      .then((res) => {
        if (active) setVehicles(res.data.data || [])
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
    <div className="min-h-screen bg-[#fcfcfd]">
      {/* Dark Luxury Header Banner */}
      <section className="relative overflow-hidden bg-[#09090b] text-white pt-12 pb-16 border-b border-neutral-800">
        <div
          className="absolute -top-32 right-10 w-96 h-96 rounded-full bg-brand/15 blur-[100px] pointer-events-none"
          aria-hidden="true"
        />
        <div className="container-page relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-gray-300 backdrop-blur-md">
                <Heart size={13} className="text-brand fill-brand" />
                <span>PERSONAL SHOWROOM GARAGE</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-white leading-none">
                Saved Favourites
              </h1>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal">
                Vehicles you have bookmarked for comparison, inspection, or purchase at TS SALES MART.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md px-4 py-2.5 text-xs font-bold text-white shadow-md">
                {favoriteIds.length} {favoriteIds.length === 1 ? 'Vehicle' : 'Vehicles'} Saved
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Garage Section */}
      <div className="container-page py-12">
        {/* Device Sync Notice for Guests */}
        {!user && favoriteIds.length > 0 && (
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-red-200 bg-red-50/70 p-4 shadow-sm">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-800">
              <Sparkles className="shrink-0 text-brand" size={20} />
              <p>
                Favourites are currently saved on this device. Sign in or create an account to sync your vehicles across your phone, tablet, and PC.
              </p>
            </div>
            <Link to="/login" className="btn-dark !py-2 !px-4 shrink-0 text-xs font-bold">
              Sign In / Sync
            </Link>
          </div>
        )}

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm animate-pulse space-y-4"
              >
                <div className="aspect-[16/10] w-full rounded-xl bg-neutral-200" />
                <div className="h-4 w-3/4 rounded bg-neutral-200" />
                <div className="h-6 w-1/2 rounded bg-neutral-200" />
              </div>
            ))}
          </div>
        ) : vehicles.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-neutral-300 bg-white p-12 text-center max-w-xl mx-auto my-6 shadow-sm">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-red-50 text-brand mb-4">
              <Heart size={32} />
            </div>
            <h2 className="font-display text-2xl font-bold uppercase text-neutral-900">Your Garage is Empty</h2>
            <p className="mt-2 text-xs sm:text-sm text-neutral-500 max-w-md mx-auto leading-relaxed">
              You haven't saved any vehicles yet. Explore our current inventory of quality Japanese cars and vans, then tap the heart icon on any vehicle to pin it to your personal showroom.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/vehicles" className="btn-primary">
                Explore Available Vehicles <ArrowRight size={15} />
              </Link>
              <Link to="/contact" className="btn-outline-dark">
                Contact Our Team
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {vehicles.map((v) => (
                <VehicleCard key={v._id || v.id} vehicle={v} />
              ))}
            </div>

            {/* Quick Action Contact Banner for Saved List */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-1.5 text-brand text-xs font-bold uppercase">
                  <ShieldCheck size={16} />
                  <span>Ready for Inspection in Chunnakam?</span>
                </div>
                <h3 className="font-display text-2xl font-bold uppercase text-neutral-900">
                  Contact Our Showroom About These Vehicles
                </h3>
                <p className="text-xs text-neutral-500 max-w-xl">
                  Call our sales hotlines or WhatsApp us to schedule an on-site vehicle inspection and verify ownership papers.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                {BUSINESS.phones.map((p) => (
                  <a key={p.href} href={p.href} className="btn-primary !py-2.5 text-xs font-bold">
                    <Phone size={14} /> Call {p.display}
                  </a>
                ))}
                <a
                  href={BUSINESS.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn bg-[#25D366] text-white hover:bg-[#20ba59] !py-2.5 text-xs font-bold"
                >
                  <MessageSquare size={14} /> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
