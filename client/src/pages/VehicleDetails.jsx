import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Phone,
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Calculator,
  CheckCircle2,
  Gauge,
  Fuel,
  Settings2,
  Calendar,
  Sparkles,
  Maximize2,
  Scale,
} from 'lucide-react'
import { fetchVehicle } from '../features/vehicles/vehicleService'
import VehicleCard from '../features/vehicles/VehicleCard'
import InquiryForm from '../features/inquiries/InquiryForm'
import LoanCalculator from '../components/LoanCalculator'
import ImageLightbox from '../components/ImageLightbox'
import { formatLKR, formatKm, formatLKRWords } from '../utils/format'
import { BUSINESS, ASSETS } from '../utils/constants'
import { usePageTitle } from '../hooks/usePageTitle'
import { useFavorites } from '../features/favorites/FavoritesContext'
import { useCompare } from '../features/compare/CompareContext'
import { useToast } from '../context/ToastContext'

const STATUS_LABEL = { available: 'Available', reserved: 'Reserved', sold: 'Sold' }

export default function VehicleDetails() {
  const { id } = useParams()
  const [state, setState] = useState({ status: 'loading' })
  const [img, setImg] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const { isFavorite, toggleFavorite } = useFavorites()
  const { isInCompare, toggleCompare } = useCompare()
  const { showToast } = useToast()

  useEffect(() => {
    let active = true
    setState({ status: 'loading' })
    setImg(0)
    fetchVehicle(id)
      .then((r) => {
        if (active) setState({ status: 'ok', v: r.data, related: r.related })
      })
      .catch((e) => {
        if (active) setState({ status: e.response?.status === 404 ? 'missing' : 'error' })
      })
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return () => {
      active = false
    }
  }, [id])

  const v = state.v
  const favored = isFavorite(v?._id)
  usePageTitle(v ? `${v.title} — ${formatLKR(v.price)} | TS SALES MART` : 'Vehicle Details | TS SALES MART')

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href)
    showToast({ message: 'Vehicle link copied to clipboard!', type: 'success' })
  }

  const handleFavorite = () => {
    if (!v) return
    toggleFavorite(v)
    showToast({
      message: favored ? 'Removed from favourites' : 'Saved to your favourites',
      type: favored ? 'info' : 'success',
    })
  }

  if (state.status === 'loading') {
    return (
      <div className="container-page py-20 text-center">
        <div className="mx-auto h-12 w-12 rounded-full border-4 border-gray-200 border-t-brand animate-spin" />
        <p className="mt-4 text-sm text-muted font-medium">Loading vehicle details from showroom...</p>
      </div>
    )
  }

  if (state.status !== 'ok') {
    return (
      <div className="container-page py-20 text-center max-w-md mx-auto">
        <h1 className="section-title">
          {state.status === 'missing' ? 'Vehicle Not Found' : 'Something Went Wrong'}
        </h1>
        <p className="mt-2 text-sm text-muted">
          This vehicle may have been sold or removed. Explore our current stock of cars and vans.
        </p>
        <Link to="/vehicles" className="btn-primary mt-6">
          Browse Available Vehicles
        </Link>
      </div>
    )
  }

  const images = v.images?.length ? v.images.map((i) => i.url) : [ASSETS.logo]
  const waMessage = encodeURIComponent(
    `Hello TS Sales Mart, I am interested in the ${v.title} (${formatLKR(v.price)}) listed on your website. Is it available for inspection at your Chunnakam showroom?`
  )
  const waUrl = `https://wa.me/94772056400?text=${waMessage}`

  return (
    <div className="container-page py-10">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-muted">
        <Link to="/" className="hover:text-brand">Home</Link>
        <span>/</span>
        <Link to="/vehicles" className="hover:text-brand">Vehicles</Link>
        <span>/</span>
        <span className="text-gray-800 font-semibold truncate max-w-xs">{v.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* Left Gallery & Vehicle Story */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">
          {/* Main Visual Display */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-3xl bg-neutral-900 border border-gray-200 shadow-xl group">
            <img
              src={images[img]}
              alt={`${v.title} photograph ${img + 1}`}
              onClick={() => setLightbox(true)}
              className={`h-full w-full cursor-zoom-in transition-transform duration-500 group-hover:scale-102 ${v.images?.length ? 'object-cover' : 'object-contain p-12'}`}
              onError={(e) => {
                e.currentTarget.src = ASSETS.logo
              }}
            />

            {/* Click to Enlarge Badge */}
            <button
              type="button"
              onClick={() => setLightbox(true)}
              className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md hover:bg-black/80 transition cursor-pointer"
            >
              <Maximize2 size={13} /> Click to Enlarge
            </button>

            {/* Photo Navigation Overlay */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={() => setImg((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/80 transition cursor-pointer"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={() => setImg((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black/80 transition cursor-pointer"
                >
                  <ChevronRight size={22} />
                </button>
                <span className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                  {img + 1} / {images.length}
                </span>
              </>
            )}
          </div>

          {/* Thumbnails Row */}
          {images.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
              {images.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => setImg(i)}
                  aria-label={`Show photo ${i + 1}`}
                  className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition cursor-pointer ${
                    i === img ? 'border-brand scale-102 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Key Quick Highlight Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-gray-200 bg-surface p-4">
              <span className="text-[11px] font-bold uppercase text-muted flex items-center gap-1.5">
                <Calendar size={13} className="text-brand" /> Year
              </span>
              <p className="mt-1 font-extrabold text-lg text-ink">{v.year}</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-surface p-4">
              <span className="text-[11px] font-bold uppercase text-muted flex items-center gap-1.5">
                <Gauge size={13} className="text-brand" /> Mileage
              </span>
              <p className="mt-1 font-extrabold text-lg text-ink">{formatKm(v.mileage)}</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-surface p-4">
              <span className="text-[11px] font-bold uppercase text-muted flex items-center gap-1.5">
                <Fuel size={13} className="text-brand" /> Fuel
              </span>
              <p className="mt-1 font-extrabold text-lg text-ink">{v.fuelType}</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-surface p-4">
              <span className="text-[11px] font-bold uppercase text-muted flex items-center gap-1.5">
                <Settings2 size={13} className="text-brand" /> Transmission
              </span>
              <p className="mt-1 font-extrabold text-lg text-ink">{v.transmission}</p>
            </div>
          </div>

          {/* Comprehensive Specifications Table */}
          <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h2 className="font-display text-2xl font-bold uppercase text-ink">
                Technical Specifications
              </h2>
              <span className="badge bg-surface text-gray-700 font-bold border border-gray-200">
                {v.condition === 'new' ? 'Brand New Import' : 'Pre-Owned Checked'}
              </span>
            </div>

            <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <dt className="text-muted">Brand / Manufacturer</dt>
                <dd className="font-bold text-ink">{v.brand}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <dt className="text-muted">Model Name</dt>
                <dd className="font-bold text-ink">{v.model}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <dt className="text-muted">Body Type</dt>
                <dd className="font-bold text-ink capitalize">{v.type} {v.category ? `(${v.category})` : ''}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <dt className="text-muted">Year of Manufacture</dt>
                <dd className="font-bold text-ink">{v.year}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <dt className="text-muted">Engine Displacement</dt>
                <dd className="font-bold text-ink">{v.engineCapacity ? `${v.engineCapacity} cc` : 'N/A'}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <dt className="text-muted">Transmission</dt>
                <dd className="font-bold text-ink">{v.transmission}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <dt className="text-muted">Fuel Type</dt>
                <dd className="font-bold text-ink">{v.fuelType}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <dt className="text-muted">Odometer Mileage</dt>
                <dd className="font-bold text-ink">{formatKm(v.mileage)}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <dt className="text-muted">Exterior Colour</dt>
                <dd className="font-bold text-ink">{v.colour || 'Standard Factory'}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <dt className="text-muted">Seating Capacity</dt>
                <dd className="font-bold text-ink">{v.seats ? `${v.seats} Seats` : 'Standard'}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <dt className="text-muted">Showroom Location</dt>
                <dd className="font-bold text-ink">{v.location || 'Chunnakam'}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <dt className="text-muted">Availability Status</dt>
                <dd className="font-bold text-brand uppercase">{STATUS_LABEL[v.status]}</dd>
              </div>
            </dl>
          </div>

          {/* Detailed Description */}
          {v.description && (
            <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="font-display text-2xl font-bold uppercase text-ink border-b border-gray-100 pb-4">
                Vehicle Overview &amp; Features
              </h2>
              <p className="mt-4 whitespace-pre-line text-sm sm:text-base text-gray-700 leading-relaxed">
                {v.description}
              </p>
            </div>
          )}

          {/* Interactive Estimated Loan Calculator */}
          <LoanCalculator vehiclePrice={v.price} vehicleTitle={v.title} />
        </div>

        {/* Right Sticky Pricing & Contact Column */}
        <aside className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-24 lg:self-start">
          {/* Main Pricing Box */}
          <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-xl">
            <div className="flex items-center justify-between">
              <span
                className={`badge px-3 py-1 font-bold ${
                  v.status === 'available'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {STATUS_LABEL[v.status]}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => toggleCompare(v)}
                  aria-label={isInCompare(v._id) ? 'Remove from compare' : 'Add to compare'}
                  title={isInCompare(v._id) ? 'In comparison' : 'Compare with another vehicle'}
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold border transition cursor-pointer ${
                    isInCompare(v._id)
                      ? 'border-brand bg-brand text-white'
                      : 'border-gray-200 text-gray-600 hover:text-brand'
                  }`}
                >
                  <Scale size={13} />
                  {isInCompare(v._id) ? 'Comparing' : 'Compare'}
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Share this vehicle"
                  title="Share link"
                  className="rounded-full p-2 text-gray-500 hover:bg-surface hover:text-ink transition cursor-pointer"
                >
                  <Share2 size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleFavorite}
                  aria-label={favored ? 'Remove from favourites' : 'Add to favourites'}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold border transition cursor-pointer ${
                    favored
                      ? 'border-brand bg-brand/10 text-brand'
                      : 'border-gray-200 text-gray-600 hover:text-brand'
                  }`}
                >
                  <Heart size={14} className={favored ? 'fill-brand text-brand' : ''} />
                  {favored ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>

            <h1 className="mt-4 text-2xl font-extrabold text-ink leading-tight">
              {v.title}
            </h1>
            <p className="text-xs text-muted mt-1">{v.year} · {v.brand} {v.model}</p>

            <div className="mt-4 rounded-2xl bg-surface p-4 border border-gray-100">
              <span className="text-[11px] font-bold uppercase text-muted tracking-wider">
                Asking Price (LKR)
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <p className="text-3xl font-black text-brand tracking-tight">
                  {formatLKR(v.price)}
                </p>
                <span className="text-xs font-bold text-gray-500">
                  ({formatLKRWords(v.price)})
                </span>
              </div>
              <p className="text-[11px] text-muted mt-1">
                Negotiable upon showroom inspection in Chunnakam.
              </p>
            </div>

            {/* Direct Contact Actions */}
            <div className="mt-6 space-y-2.5">
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp w-full !py-3.5 text-sm font-bold justify-center"
              >
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>

              {BUSINESS.phones.map((p) => (
                <a
                  key={p.href}
                  href={p.href}
                  className="btn-primary w-full !py-3 text-sm justify-center"
                >
                  <Phone size={16} /> Call {p.display}
                </a>
              ))}
            </div>

            {/* Showroom Verification Badge */}
            <div className="mt-6 pt-5 border-t border-gray-100 flex items-start gap-3 text-xs text-gray-600">
              <ShieldCheck className="text-brand shrink-0 mt-0.5" size={20} />
              <div>
                <p className="font-bold text-ink">TS SALES MART Showroom Guarantee</p>
                <p className="mt-0.5 text-muted leading-relaxed">
                  Located at {BUSINESS.address}. Physical inspection and vehicle document verification available.
                </p>
              </div>
            </div>
          </div>

          {/* Embedded Customer Inquiry Form */}
          {v.status !== 'sold' && (
            <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-sm">
              <h2 className="font-display text-xl font-bold uppercase text-ink">
                Send Direct Showroom Inquiry
              </h2>
              <p className="text-xs text-muted mt-1 mb-4">
                Leave your phone number and message; our sales team will reach out promptly.
              </p>
              <InquiryForm
                vehicle={v._id}
                defaultMessage={`Hello TS Sales Mart, I am interested in inquiring about the ${v.title} listed at ${formatLKR(v.price)}.`}
              />
            </div>
          )}
        </aside>
      </div>

      {/* Related Vehicles Section */}
      {!!state.related?.length && (
        <section className="mt-20 border-t border-gray-200 pt-12" aria-labelledby="rel-h">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="eyebrow">Similar Inventory</p>
              <h2 id="rel-h" className="section-title mt-1">Related Vehicles You May Like</h2>
            </div>
            <Link to={`/vehicles?type=${v.type}`} className="text-sm font-bold text-brand hover:underline">
              View all {v.type}s →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {state.related.map((r) => (
              <VehicleCard key={r._id || r.id} vehicle={r} />
            ))}
          </div>
        </section>
      )}

      {/* Fullscreen Image Lightbox Modal */}
      {lightbox && (
        <ImageLightbox
          images={images}
          currentIndex={img}
          onClose={() => setLightbox(false)}
          onIndexChange={setImg}
        />
      )}
    </div>
  )
}
