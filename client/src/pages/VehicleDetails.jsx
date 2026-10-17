import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Phone,
  Heart,
  Calendar,
  Gauge,
  Fuel,
  Settings2,
  Zap,
  Palette,
  Users,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  MessageSquare,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { fetchVehicle } from '../features/vehicles/vehicleService'
import VehicleCard from '../features/vehicles/VehicleCard'
import InquiryForm from '../features/inquiries/InquiryForm'
import { formatLKR, formatKm } from '../utils/format'
import { BUSINESS, ASSETS } from '../utils/constants'
import { usePageTitle } from '../hooks/usePageTitle'
import { useFavorites } from '../features/favorites/FavoritesContext'

const STATUS_CONFIG = {
  available: { label: 'Available in Showroom', bg: 'bg-emerald-500/10 text-emerald-700 border-emerald-300' },
  reserved: { label: 'Reserved / Pending', bg: 'bg-amber-500/10 text-amber-700 border-amber-300' },
  sold: { label: 'Sold Out', bg: 'bg-neutral-500/10 text-neutral-700 border-neutral-300' },
}

export default function VehicleDetails() {
  const { id } = useParams()
  const [state, setState] = useState({ status: 'loading' })
  const [imgIndex, setImgIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  useEffect(() => {
    let active = true
    setState({ status: 'loading' })
    setImgIndex(0)
    fetchVehicle(id)
      .then((r) => {
        if (active) setState({ status: 'ok', v: r.data, related: r.related })
      })
      .catch((e) => {
        if (active) setState({ status: e.response?.status === 404 ? 'missing' : 'error' })
      })
    return () => {
      active = false
    }
  }, [id])

  const v = state.v
  const { isFavorite, toggleFavorite } = useFavorites()
  const favored = isFavorite(v?._id)
  usePageTitle(v ? `${v.title} | TS SALES MART` : 'Vehicle Details | TS SALES MART')

  if (state.status === 'loading') {
    return (
      <div className="container-page py-20">
        <div className="grid gap-8 lg:grid-cols-12 animate-pulse">
          <div className="lg:col-span-8 space-y-4">
            <div className="aspect-[16/10] rounded-3xl bg-neutral-200" />
            <div className="flex gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-20 w-28 rounded-xl bg-neutral-200" />
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 space-y-4">
            <div className="h-48 rounded-3xl bg-neutral-200" />
            <div className="h-64 rounded-3xl bg-neutral-200" />
          </div>
        </div>
      </div>
    )
  }

  if (state.status !== 'ok') {
    return (
      <div className="container-page py-20 text-center max-w-lg mx-auto">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-red-50 text-brand mb-4">
          <ShieldCheck size={32} />
        </div>
        <h1 className="font-display text-3xl font-extrabold uppercase">
          {state.status === 'missing' ? 'Vehicle Not Found' : 'Something Went Wrong'}
        </h1>
        <p className="mt-3 text-sm text-neutral-500">
          The requested automobile is no longer listed or the link is expired. Please browse our current showroom collection.
        </p>
        <Link to="/vehicles" className="btn-primary mt-6 inline-flex">
          Browse All Vehicles <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  const images = v.images?.length ? v.images.map((i) => i.url) : [ASSETS.logo]
  const statusInfo = STATUS_CONFIG[v.status] || STATUS_CONFIG.available

  const whatsappInquiryUrl = `${BUSINESS.whatsappUrl}?text=${encodeURIComponent(
    `Hello TS SALES MART, I am interested in the ${v.title} (Price: ${formatLKR(v.price)}) listed on your website.`
  )}`

  const specs = [
    { label: 'Brand', value: v.brand, icon: Settings2 },
    { label: 'Model', value: v.model, icon: Settings2 },
    { label: 'Year', value: v.year, icon: Calendar },
    { label: 'Mileage', value: formatKm(v.mileage), icon: Gauge },
    { label: 'Fuel Type', value: v.fuelType, icon: Fuel },
    { label: 'Transmission', value: v.transmission, icon: Settings2 },
    { label: 'Engine Capacity', value: v.engineCapacity ? `${v.engineCapacity} cc` : null, icon: Zap },
    { label: 'Condition', value: v.condition === 'new' ? 'Brand New' : 'Pre-Owned', icon: Sparkles },
    { label: 'Exterior Colour', value: v.colour, icon: Palette },
    { label: 'Seats', value: v.seats ? `${v.seats} Seats` : null, icon: Users },
    { label: 'Location', value: v.location, icon: MapPin },
  ].filter((s) => s.value)

  return (
    <div className="min-h-screen bg-[#fcfcfd] py-10">
      <div className="container-page">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-semibold text-neutral-500">
          <Link to="/" className="hover:text-brand transition">Home</Link>
          <span>/</span>
          <Link to="/vehicles" className="hover:text-brand transition">Cars &amp; Vans</Link>
          <span>/</span>
          <span className="text-neutral-800 truncate max-w-xs sm:max-w-md">{v.title}</span>
        </nav>

        {/* Main Showroom Grid */}
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* Left Column: Image Showcase & Technical Specifications */}
          <div className="lg:col-span-8 space-y-8">
            {/* Main Showcase Image Container */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-neutral-200/90 bg-neutral-900 shadow-xl group">
              <img
                src={images[imgIndex]}
                alt={`${v.title} photograph ${imgIndex + 1}`}
                className={`h-full w-full ${v.images?.length ? 'object-cover' : 'object-contain p-12'}`}
                onError={(e) => {
                  e.currentTarget.src = ASSETS.logo
                }}
              />

              {/* Badges Over Image */}
              <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-extrabold tracking-wide shadow-md backdrop-blur-md ${
                    v.condition === 'new' ? 'bg-emerald-600 text-white' : 'bg-black/80 text-white'
                  }`}
                >
                  {v.condition === 'new' && <Sparkles size={12} />}
                  {v.condition === 'new' ? 'Brand New' : 'Pre-Owned'}
                </span>
                <span className="rounded-xl bg-white/95 backdrop-blur-md px-3 py-1.5 text-xs font-black text-neutral-900 shadow-md">
                  {v.year}
                </span>
                <span className={`rounded-xl border px-3 py-1.5 text-xs font-bold shadow-md backdrop-blur-md ${statusInfo.bg}`}>
                  {statusInfo.label}
                </span>
              </div>

              {/* Lightbox Trigger Button */}
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                aria-label="View full screen image"
                className="absolute right-4 bottom-4 grid h-10 w-10 place-items-center rounded-2xl bg-black/60 text-white backdrop-blur-md transition hover:bg-brand hover:scale-105 cursor-pointer shadow-lg"
              >
                <Maximize2 size={18} />
              </button>

              {/* Photo Index Counter */}
              {images.length > 1 && (
                <div className="absolute left-4 bottom-4 rounded-xl bg-black/70 px-3 py-1 text-xs font-bold text-white backdrop-blur-md shadow-md">
                  {imgIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Carousel (Smooth Swipeable on Mobile) */}
            {images.length > 1 && (
              <div className="flex gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar pb-2">
                {images.map((src, i) => (
                  <button
                    key={src + i}
                    onClick={() => setImgIndex(i)}
                    aria-label={`Show photo ${i + 1}`}
                    className={`relative h-16 w-24 sm:h-20 sm:w-28 shrink-0 overflow-hidden rounded-2xl border-2 transition-all duration-200 cursor-pointer active:scale-95 ${
                      i === imgIndex
                        ? 'border-brand ring-2 ring-red-200 shadow-md scale-[1.02]'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Specifications Grid */}
            <div className="rounded-3xl border border-neutral-200/90 bg-white p-5 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6">
                <div>
                  <p className="eyebrow">Technical Details</p>
                  <h2 className="font-display text-xl sm:text-2xl font-bold uppercase mt-1">Vehicle Specifications</h2>
                </div>
                <span className="badge bg-neutral-100 text-neutral-700 font-bold uppercase text-xs">
                  {v.type}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3">
                {specs.map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-start gap-2.5 sm:gap-3 rounded-2xl border border-neutral-100 bg-neutral-50/80 p-3 sm:p-3.5 transition-all duration-200 hover:border-neutral-200 hover:bg-neutral-50"
                  >
                    <div className="grid h-8 w-8 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-xl bg-white text-brand shadow-xs border border-neutral-200/60">
                      <Icon size={15} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-[11px] font-semibold text-neutral-400 uppercase tracking-wider truncate">{label}</p>
                      <p className="font-bold text-xs sm:text-sm text-neutral-900 mt-0.5 truncate">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vehicle Description */}
            {v.description && (
              <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm">
                <p className="eyebrow">Overview</p>
                <h2 className="font-display text-2xl font-bold uppercase mt-1 mb-4">Vehicle Description</h2>
                <div className="prose prose-neutral max-w-none text-neutral-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                  {v.description}
                </div>
              </div>
            )}

            {/* Inspection & Trust Verification Card */}
            <div className="rounded-3xl border border-neutral-800 bg-[#09090b] text-white p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-2 text-brand font-bold text-xs uppercase tracking-widest">
                <ShieldCheck size={16} />
                <span>Dealership Guarantee · Chunnakam</span>
              </div>
              <h3 className="font-display text-2xl font-bold uppercase mt-2">
                Why Buy This Vehicle from TS SALES MART?
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-brand shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-white">100% Genuine Mileage Verification</p>
                    <p className="text-xs text-neutral-400 mt-0.5">Odometer readings are verified against auction and maintenance records.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-brand shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-white">Clear Title &amp; Ownership</p>
                    <p className="text-xs text-neutral-400 mt-0.5">Transparent registration and transfer paperwork guaranteed with every purchase.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-brand shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-white">Full Mechanical Inspection</p>
                    <p className="text-xs text-neutral-400 mt-0.5">Inspected engine, hybrid battery, suspension, brakes, and electrical systems.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-brand shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-white">Fair Trade-in &amp; Exchange</p>
                    <p className="text-xs text-neutral-400 mt-0.5">Exchange your existing vehicle with immediate fair valuation at our showroom.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Pricing & Action Console */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            {/* Price & Primary Call-to-Actions */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-7 shadow-xl shadow-black/5">
              <div className="flex items-center justify-between gap-2">
                <span className={`badge border text-xs font-bold ${statusInfo.bg}`}>
                  {statusInfo.label}
                </span>
                <button
                  type="button"
                  onClick={() => toggleFavorite(v)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold border transition cursor-pointer ${
                    favored
                      ? 'border-brand bg-brand/10 text-brand'
                      : 'border-neutral-200 text-neutral-600 hover:text-brand hover:border-neutral-300'
                  }`}
                >
                  <Heart size={14} className={favored ? 'fill-brand text-brand' : ''} />
                  {favored ? 'Saved' : 'Save'}
                </button>
              </div>

              <div className="mt-4">
                <p className="text-xs font-bold uppercase tracking-wider text-brand">
                  {v.brand} · {v.type.toUpperCase()}
                </p>
                <h1 className="mt-1 font-display text-3xl font-extrabold uppercase leading-tight text-neutral-900">
                  {v.title}
                </h1>
              </div>

              <div className="mt-4 border-y border-neutral-100 py-4">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Official Asking Price</span>
                <p className="font-display text-4xl font-black text-brand tracking-tight mt-0.5">
                  {formatLKR(v.price)}
                </p>
                <p className="text-[11px] text-neutral-500 mt-1">
                  * Price in Sri Lankan Rupees (LKR). Inspection &amp; negotiation welcome at showroom.
                </p>
              </div>

              {/* Direct Calling Buttons */}
              <div className="mt-6 space-y-2.5">
                {BUSINESS.phones.map((p) => (
                  <a
                    key={p.href}
                    href={p.href}
                    className="btn-primary w-full !py-3.5 text-sm font-bold justify-center shadow-lg shadow-red-950/20"
                  >
                    <Phone size={16} /> Call Now: {p.display}
                  </a>
                ))}

                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn w-full !py-3 text-sm font-bold justify-center bg-[#25D366] text-white hover:bg-[#20ba59] shadow-sm transition"
                >
                  <MessageSquare size={16} /> WhatsApp Inquiry
                </a>
              </div>

              {/* Showroom Address Reference */}
              <div className="mt-6 border-t border-neutral-100 pt-4 text-xs text-neutral-600 space-y-1.5">
                <p className="flex items-start gap-2 font-medium">
                  <MapPin size={15} className="text-brand shrink-0 mt-0.5" />
                  <span>{BUSINESS.address}</span>
                </p>
                <p className="text-[11px] text-neutral-400 pl-6">
                  Hours: {BUSINESS.hours} (Sunday by appointment)
                </p>
              </div>
            </div>

            {/* Embedded Inquiry Form */}
            {v.status !== 'sold' && (
              <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h3 className="font-display text-xl font-bold uppercase mb-1">Send An Inquiry</h3>
                <p className="text-xs text-neutral-500 mb-4">
                  Send your questions to our sales team and we will respond immediately.
                </p>
                <InquiryForm vehicle={v._id} defaultMessage={`Hello, I am interested in inspecting the ${v.title}.`} />
              </div>
            )}
          </aside>
        </div>

        {/* Related Vehicles Showcase */}
        {!!state.related?.length && (
          <section className="mt-20 border-t border-neutral-200 pt-14" aria-labelledby="rel-h">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <p className="eyebrow">Explore Similar Stock</p>
                <h2 id="rel-h" className="section-title mt-1">Related Vehicles</h2>
              </div>
              <Link to="/vehicles" className="text-xs font-bold text-brand hover:underline flex items-center gap-1">
                View Full Showroom <ArrowRight size={13} />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {state.related.map((r) => (
                <VehicleCard key={r._id || r.id} vehicle={r} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Floating Action Strip for Mobile (Above Global Bottom Bar) */}
      <div className="fixed bottom-14 inset-x-0 z-30 lg:hidden bg-white/95 backdrop-blur-xl border-t border-neutral-200 px-4 py-2.5 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase font-bold text-neutral-400 block leading-tight">Price</span>
          <span className="font-display text-lg font-black text-brand leading-none">{formatLKR(v.price)}</span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={BUSINESS.phones[0].href}
            className="btn-primary !py-2 !px-3.5 text-xs font-bold shadow-md shadow-red-950/20 flex items-center gap-1.5 rounded-xl"
          >
            <Phone size={13} />
            <span>Call</span>
          </a>

          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noreferrer"
            className="btn !py-2 !px-3.5 text-xs font-bold bg-[#25D366] text-white hover:bg-[#20ba59] shadow-sm flex items-center gap-1.5 rounded-xl"
          >
            <MessageSquare size={13} />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Lightbox Fullscreen Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl animate-in fade-in"
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close photo preview"
            className="absolute top-5 right-5 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white hover:text-black transition cursor-pointer"
          >
            <X size={24} />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setImgIndex((imgIndex - 1 + images.length) % images.length)}
                aria-label="Previous photo"
                className="absolute left-5 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white hover:text-black transition cursor-pointer"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={() => setImgIndex((imgIndex + 1) % images.length)}
                aria-label="Next photo"
                className="absolute right-5 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white hover:text-black transition cursor-pointer"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <div className="max-w-5xl max-h-[85vh] overflow-hidden rounded-2xl">
            <img
              src={images[imgIndex]}
              alt={`${v.title} full size`}
              className="max-h-[85vh] w-auto max-w-full object-contain mx-auto"
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-md">
            {imgIndex + 1} of {images.length}
          </div>
        </div>
      )}
    </div>
  )
}
