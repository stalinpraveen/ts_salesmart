import { Link } from 'react-router-dom'
import { Heart, Gauge, Fuel, Settings2 } from 'lucide-react'
import { formatLKR, formatKm } from '../../utils/format'
import { useFavorites } from '../favorites/FavoritesContext'

const FALLBACK = '/assets/ts-sales-mart-logo.png'

export default function VehicleCard({ vehicle }) {
  const id = vehicle._id || vehicle.id
  const image = vehicle.images?.[0]?.url || vehicle.images?.[0] || FALLBACK
  const { isFavorite, toggleFavorite } = useFavorites()
  const favored = isFavorite(id)

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] bg-surface">
        <img
          src={image}
          alt={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
          loading="lazy"
          onError={(e) => { e.currentTarget.src = FALLBACK; e.currentTarget.className = 'h-full w-full object-contain p-8' }}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="badge absolute left-3 top-3 bg-ink text-white">{vehicle.condition === 'new' ? 'Brand New' : 'Pre-Owned'}</span>
        <button
          type="button"
          aria-label={favored ? 'Remove from favourites' : 'Add to favourites'}
          aria-pressed={favored}
          onClick={(e) => {
            e.preventDefault()
            toggleFavorite(vehicle)
          }}
          className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full shadow transition-all duration-200 cursor-pointer ${
            favored
              ? 'bg-white text-brand scale-105 shadow-md'
              : 'bg-white/90 text-gray-600 hover:text-brand hover:scale-105'
          }`}
        >
          <Heart size={18} className={favored ? 'fill-brand text-brand' : ''} />
        </button>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold">{vehicle.brand} {vehicle.model} <span className="font-medium text-muted">{vehicle.year}</span></h3>
        <p className="mt-1 text-xl font-extrabold text-brand">{formatLKR(vehicle.price)}</p>
        <ul className="mt-4 grid grid-cols-3 gap-2 text-xs text-muted">
          <li className="flex items-center gap-1"><Gauge size={14} />{formatKm(vehicle.mileage)}</li>
          <li className="flex items-center gap-1"><Fuel size={14} />{vehicle.fuelType}</li>
          <li className="flex items-center gap-1"><Settings2 size={14} />{vehicle.transmission}</li>
        </ul>
        <Link to={`/vehicles/${id}`} className="btn-dark mt-5 w-full">View Details</Link>
      </div>
    </article>
  )
}
