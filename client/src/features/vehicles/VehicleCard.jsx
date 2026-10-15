import { Link } from 'react-router-dom'
import { Heart, Gauge, Fuel, Settings2, ArrowRight, Sparkles } from 'lucide-react'
import { formatLKR, formatKm } from '../../utils/format'
import { useFavorites } from '../favorites/FavoritesContext'

const FALLBACK = '/assets/ts-sales-mart-logo.png'

export default function VehicleCard({ vehicle }) {
  const id = vehicle._id || vehicle.id
  const image = vehicle.images?.[0]?.url || vehicle.images?.[0] || FALLBACK
  const { isFavorite, toggleFavorite } = useFavorites()
  const favored = isFavorite(id)

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 hover:border-neutral-300 flex flex-col justify-between">
      <div>
        {/* Vehicle Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
          <img
            src={image}
            alt={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = FALLBACK
              e.currentTarget.className = 'h-full w-full object-contain p-8'
            }}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Badges Overlay */}
          <div className="absolute left-3 top-3 flex items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold tracking-wide shadow-sm backdrop-blur-md ${
                vehicle.condition === 'new'
                  ? 'bg-emerald-600/90 text-white'
                  : 'bg-black/75 text-white'
              }`}
            >
              {vehicle.condition === 'new' && <Sparkles size={11} />}
              {vehicle.condition === 'new' ? 'Brand New' : 'Pre-Owned'}
            </span>
            <span className="rounded-lg bg-white/90 backdrop-blur-md px-2 py-1 text-[11px] font-extrabold text-neutral-800 shadow-sm">
              {vehicle.year}
            </span>
          </div>

          {/* Favorite Toggle Action */}
          <button
            type="button"
            aria-label={favored ? 'Remove from favourites' : 'Add to favourites'}
            aria-pressed={favored}
            onClick={(e) => {
              e.preventDefault()
              toggleFavorite(vehicle)
            }}
            className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full shadow-md backdrop-blur-sm transition-all duration-200 cursor-pointer ${
              favored
                ? 'bg-white text-brand scale-105 ring-2 ring-red-100'
                : 'bg-white/85 text-neutral-600 hover:text-brand hover:scale-105 hover:bg-white'
            }`}
          >
            <Heart size={17} className={favored ? 'fill-brand text-brand' : ''} />
          </button>
        </div>

        {/* Content Details */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-brand">
                {vehicle.brand}
              </p>
              <h3 className="text-lg font-bold text-neutral-900 group-hover:text-brand transition-colors line-clamp-1">
                {vehicle.model}
              </h3>
            </div>
            <span className="badge bg-neutral-100 text-neutral-600 font-semibold uppercase text-[10px] mt-0.5 shrink-0">
              {vehicle.type}
            </span>
          </div>

          {/* Price */}
          <p className="mt-2.5 font-display text-2xl font-black text-brand tracking-tight">
            {formatLKR(vehicle.price)}
          </p>

          {/* Specifications Pills */}
          <ul className="mt-4 grid grid-cols-3 gap-1.5 border-t border-neutral-100 pt-3 text-[11px] font-medium text-neutral-600">
            <li className="flex items-center gap-1 bg-neutral-50 rounded-lg p-1.5" title="Mileage">
              <Gauge size={13} className="text-brand shrink-0" />
              <span className="truncate">{formatKm(vehicle.mileage)}</span>
            </li>
            <li className="flex items-center gap-1 bg-neutral-50 rounded-lg p-1.5" title="Fuel Type">
              <Fuel size={13} className="text-brand shrink-0" />
              <span className="truncate">{vehicle.fuelType}</span>
            </li>
            <li className="flex items-center gap-1 bg-neutral-50 rounded-lg p-1.5" title="Transmission">
              <Settings2 size={13} className="text-brand shrink-0" />
              <span className="truncate">{vehicle.transmission}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Card Action Link */}
      <div className="px-5 pb-5">
        <Link
          to={`/vehicles/${id}`}
          className="btn-dark w-full !py-2.5 text-xs font-bold group-hover:bg-brand transition-colors flex items-center justify-center gap-1.5"
        >
          <span>View Details</span>
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}
