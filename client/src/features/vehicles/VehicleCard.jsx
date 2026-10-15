import { Link } from 'react-router-dom'
import { Heart, Gauge, Fuel, Settings2, Camera, MessageCircle, MapPin, Scale } from 'lucide-react'
import { formatLKR, formatKm, formatLKRWords } from '../../utils/format'
import { useFavorites } from '../favorites/FavoritesContext'
import { useCompare } from '../compare/CompareContext'
import { useToast } from '../../context/ToastContext'

const FALLBACK = '/assets/ts-sales-mart-logo.png'

export default function VehicleCard({ vehicle, layout = 'grid' }) {
  const id = vehicle._id || vehicle.id
  const image = vehicle.images?.[0]?.url || vehicle.images?.[0] || FALLBACK
  const imageCount = vehicle.images?.length || 0
  const { isFavorite, toggleFavorite } = useFavorites()
  const { isInCompare, toggleCompare } = useCompare()
  const { showToast } = useToast()
  const favored = isFavorite(id)
  const compared = isInCompare(id)

  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(vehicle)
    showToast({
      message: favored
        ? `Removed ${vehicle.brand} ${vehicle.model} from favourites`
        : `Saved ${vehicle.brand} ${vehicle.model} to favourites`,
      type: favored ? 'info' : 'success',
    })
  }

  const handleCompareClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleCompare(vehicle)
  }

  const waMessage = encodeURIComponent(
    `Hello TS Sales Mart, I would like to inquire about the ${vehicle.title || `${vehicle.brand} ${vehicle.model} ${vehicle.year}`} listed at ${formatLKR(vehicle.price)}. Is it currently available for inspection?`
  )
  const waUrl = `https://wa.me/94772056400?text=${waMessage}`

  if (layout === 'list') {
    return (
      <article className="group overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gray-300 flex flex-col md:flex-row">
        {/* Vehicle Image Viewport */}
        <div className="relative md:w-80 aspect-[16/10] md:aspect-auto shrink-0 bg-surface overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            <span className="badge bg-neutral-900/90 text-white backdrop-blur-md border border-white/10 text-[11px] font-bold">
              {vehicle.condition === 'new' ? 'Brand New' : 'Pre-Owned'}
            </span>
            {vehicle.status === 'reserved' && (
              <span className="badge bg-amber-500 text-white font-bold text-[11px]">Reserved</span>
            )}
            {vehicle.status === 'sold' && (
              <span className="badge bg-red-600 text-white font-bold text-[11px]">Sold</span>
            )}
          </div>
          {imageCount > 1 && (
            <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 text-[10px] font-semibold text-white">
              <Camera size={12} /> {imageCount} Photos
            </span>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted">{vehicle.brand}</p>
                <h3 className="text-xl font-bold text-ink leading-snug group-hover:text-brand transition-colors">
                  <Link to={`/vehicles/${id}`}>
                    {vehicle.title || `${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
                  </Link>
                </h3>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handleCompareClick}
                  title={compared ? 'In comparison' : 'Compare'}
                  className={`grid h-8 w-8 place-items-center rounded-full border transition cursor-pointer ${
                    compared ? 'bg-brand text-white border-brand shadow-sm' : 'border-gray-200 text-gray-500 hover:text-brand hover:border-brand'
                  }`}
                >
                  <Scale size={14} />
                </button>
                <button
                  type="button"
                  onClick={handleFavoriteClick}
                  title={favored ? 'Remove favourite' : 'Save favourite'}
                  className={`grid h-8 w-8 place-items-center rounded-full border transition cursor-pointer ${
                    favored ? 'bg-red-50 text-brand border-red-200 shadow-sm' : 'border-gray-200 text-gray-500 hover:text-brand hover:border-brand'
                  }`}
                >
                  <Heart size={14} className={favored ? 'fill-brand text-brand' : ''} />
                </button>
              </div>
            </div>

            <div className="mt-2 flex items-baseline gap-2">
              <p className="text-2xl font-black text-brand tracking-tight">{formatLKR(vehicle.price)}</p>
              <span className="text-xs font-semibold text-gray-400">({formatLKRWords(vehicle.price)})</span>
            </div>

            <ul className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted border-t border-gray-100 pt-3">
              <li className="flex items-center gap-1.5"><Gauge size={14} className="text-gray-400" /> {formatKm(vehicle.mileage)}</li>
              <li className="flex items-center gap-1.5"><Fuel size={14} className="text-gray-400" /> {vehicle.fuelType}</li>
              <li className="flex items-center gap-1.5"><Settings2 size={14} className="text-gray-400" /> {vehicle.transmission}</li>
              {vehicle.engineCapacity && <li>{vehicle.engineCapacity} cc</li>}
              {vehicle.location && <li className="flex items-center gap-1"><MapPin size={12} className="text-brand" /> {vehicle.location}</li>}
            </ul>
          </div>

          <div className="mt-5 pt-3 border-t border-gray-100 flex items-center gap-3">
            <Link to={`/vehicles/${id}`} className="btn-dark !py-2 !px-5 text-xs">
              View Details
            </Link>
            <a href={waUrl} target="_blank" rel="noreferrer" className="btn-whatsapp !py-2 !px-4 text-xs">
              <MessageCircle size={15} /> WhatsApp Inquiry
            </a>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-gray-300 flex flex-col justify-between">
      <div>
        {/* Vehicle Image Viewport */}
        <div className="relative aspect-[4/3] bg-surface overflow-hidden">
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

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

          {/* Condition & Status Badges */}
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            <span className="badge bg-neutral-900/90 text-white backdrop-blur-md border border-white/10 text-[11px] font-bold">
              {vehicle.condition === 'new' ? 'Brand New' : 'Pre-Owned'}
            </span>
            {vehicle.status === 'reserved' && (
              <span className="badge bg-amber-500 text-white font-bold text-[11px]">Reserved</span>
            )}
            {vehicle.status === 'sold' && (
              <span className="badge bg-red-600 text-white font-bold text-[11px]">Sold</span>
            )}
          </div>

          {/* Photo Count Pill */}
          {imageCount > 1 && (
            <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 text-[10px] font-semibold text-white">
              <Camera size={12} /> {imageCount} Photos
            </span>
          )}

          {/* Card Top Actions: Favorite and Compare */}
          <div className="absolute right-3 top-3 flex items-center gap-1.5">
            <button
              type="button"
              aria-label={compared ? 'Remove from comparison' : 'Add to comparison'}
              title={compared ? 'In comparison' : 'Compare this vehicle'}
              onClick={handleCompareClick}
              className={`grid h-9 w-9 place-items-center rounded-full shadow-md transition-all duration-200 cursor-pointer ${
                compared
                  ? 'bg-brand text-white scale-105 shadow-lg'
                  : 'bg-white/90 text-gray-700 hover:text-brand hover:scale-105 hover:bg-white'
              }`}
            >
              <Scale size={16} />
            </button>

            <button
              type="button"
              aria-label={favored ? 'Remove from favourites' : 'Add to favourites'}
              aria-pressed={favored}
              onClick={handleFavoriteClick}
              className={`grid h-9 w-9 place-items-center rounded-full shadow-md transition-all duration-200 cursor-pointer ${
                favored
                  ? 'bg-white text-brand scale-110 shadow-lg'
                  : 'bg-white/90 text-gray-600 hover:text-brand hover:scale-105 hover:bg-white'
              }`}
            >
              <Heart size={18} className={favored ? 'fill-brand text-brand' : ''} />
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted">
                {vehicle.brand}
              </p>
              <h3 className="text-lg font-bold text-ink leading-snug group-hover:text-brand transition-colors">
                <Link to={`/vehicles/${id}`}>
                  {vehicle.model} <span className="font-semibold text-gray-500">{vehicle.year}</span>
                </Link>
              </h3>
            </div>
          </div>

          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-2xl font-black text-brand tracking-tight">
              {formatLKR(vehicle.price)}
            </p>
            <span className="text-xs font-semibold text-gray-400">
              ({formatLKRWords(vehicle.price)})
            </span>
          </div>

          {/* Quick Specs Pill Grid */}
          <ul className="mt-4 grid grid-cols-3 gap-2 text-xs text-muted border-t border-b border-gray-100 py-3">
            <li className="flex items-center gap-1.5" title="Odometer Mileage">
              <Gauge size={14} className="text-gray-400 shrink-0" />
              <span className="truncate">{formatKm(vehicle.mileage)}</span>
            </li>
            <li className="flex items-center gap-1.5" title="Fuel Type">
              <Fuel size={14} className="text-gray-400 shrink-0" />
              <span className="truncate">{vehicle.fuelType}</span>
            </li>
            <li className="flex items-center gap-1.5" title="Transmission">
              <Settings2 size={14} className="text-gray-400 shrink-0" />
              <span className="truncate">{vehicle.transmission}</span>
            </li>
          </ul>

          {vehicle.location && (
            <p className="mt-3 flex items-center gap-1 text-[11px] text-gray-500">
              <MapPin size={12} className="text-brand shrink-0" /> Showroom: {vehicle.location}
            </p>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 pt-0 flex items-center gap-2">
        <Link
          to={`/vehicles/${id}`}
          className="btn-dark flex-1 !py-2.5 text-xs text-center"
        >
          View Details
        </Link>
        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Inquire about ${vehicle.brand} ${vehicle.model} on WhatsApp`}
          title="WhatsApp Inquiry"
          className="btn-whatsapp !p-2.5 rounded-xl shrink-0"
        >
          <MessageCircle size={17} />
        </a>
      </div>
    </article>
  )
}
