import { Link } from 'react-router-dom'
import { Heart, Gauge, Fuel, Settings2, ArrowRight, Sparkles, MapPin } from 'lucide-react'
import { formatLKR, formatKm } from '../../utils/format'
import { useFavorites } from '../favorites/FavoritesContext'

const FALLBACK = '/assets/ts-sales-mart-logo.png'

export default function VehicleCard({ vehicle }) {
  const id = vehicle._id || vehicle.id
  const image = vehicle.images?.[0]?.url || vehicle.images?.[0] || FALLBACK
  const { isFavorite, toggleFavorite } = useFavorites()
  const favored = isFavorite(id)

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-neutral-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/10 hover:border-brand/40 flex flex-col justify-between">
      <div>
        {/* Vehicle Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
          <img
            src={image}
            alt={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = FALLBACK
              e.currentTarget.className = 'h-full w-full object-contain p-8 bg-neutral-900'
            }}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />

          {/* Subtle Bottom Shadow Vignette */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

          {/* Badges Overlay */}
          <div className="absolute left-3 top-3 flex items-center gap-1.5 z-10">
            <span
              className={`inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-[11px] font-bold tracking-wide shadow-md backdrop-blur-md ${
                vehicle.condition === 'new'
                  ? 'bg-emerald-600/95 text-white'
                  : 'bg-black/80 text-white'
              }`}
            >
              {vehicle.condition === 'new' && <Sparkles size={11} />}
              {vehicle.condition === 'new' ? 'Brand New' : 'Pre-Owned'}
            </span>
            <span className="rounded-xl bg-white/95 backdrop-blur-md px-2.5 py-1 text-[11px] font-extrabold text-neutral-900 shadow-md">
              {vehicle.year}
            </span>
          </div>

          {/* Favorite Toggle Action with Pop Animation */}
          <button
            type="button"
            aria-label={favored ? 'Remove from favourites' : 'Add to favourites'}
            aria-pressed={favored}
            onClick={(e) => {
              e.preventDefault()
              toggleFavorite(vehicle)
            }}
            className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full shadow-lg backdrop-blur-md transition-all duration-200 cursor-pointer z-10 active:scale-90 ${
              favored
                ? 'bg-white text-brand scale-105 ring-2 ring-red-200 animate-heart-pop'
                : 'bg-black/40 text-white hover:bg-white hover:text-brand hover:scale-105'
            }`}
          >
            <Heart size={16} className={favored ? 'fill-brand text-brand' : ''} />
          </button>
        </div>

        {/* Content Details */}
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-brand">
                {vehicle.brand}
              </p>
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 group-hover:text-brand transition-colors duration-200 line-clamp-1">
                {vehicle.model}
              </h3>
            </div>
            <span className="badge bg-neutral-100 text-neutral-600 font-bold uppercase text-[10px] mt-0.5 shrink-0 px-2 py-0.5">
              {vehicle.type}
            </span>
          </div>

          {/* Price & Location */}
          <div className="mt-2.5 flex items-baseline justify-between gap-2">
            <p className="font-display text-2xl font-black text-brand tracking-tight">
              {formatLKR(vehicle.price)}
            </p>
            {vehicle.location && (
              <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-neutral-500 truncate" title={vehicle.location}>
                <MapPin size={11} className="text-brand shrink-0" />
                <span className="truncate">{vehicle.location}</span>
              </span>
            )}
          </div>

          {/* Specifications Pills */}
          <ul className="mt-3.5 grid grid-cols-3 gap-1.5 border-t border-neutral-100 pt-3 text-[10px] sm:text-[11px] font-medium text-neutral-600">
            <li className="flex items-center gap-1 bg-neutral-50 rounded-xl p-1.5 min-w-0" title="Mileage">
              <Gauge size={12} className="text-brand shrink-0" />
              <span className="truncate">{formatKm(vehicle.mileage)}</span>
            </li>
            <li className="flex items-center gap-1 bg-neutral-50 rounded-xl p-1.5 min-w-0" title="Fuel Type">
              <Fuel size={12} className="text-brand shrink-0" />
              <span className="truncate">{vehicle.fuelType}</span>
            </li>
            <li className="flex items-center gap-1 bg-neutral-50 rounded-xl p-1.5 min-w-0" title="Transmission">
              <Settings2 size={12} className="text-brand shrink-0" />
              <span className="truncate">{vehicle.transmission}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Card Action Link */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5">
        <Link
          to={`/vehicles/${id}`}
          className="btn-dark w-full !py-2.5 text-xs font-bold group-hover:bg-brand group-hover:shadow-md group-hover:shadow-red-950/20 transition-all duration-200 flex items-center justify-center gap-1.5 rounded-xl"
        >
          <span>View Details</span>
          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}

