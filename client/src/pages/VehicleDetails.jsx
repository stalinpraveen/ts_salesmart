import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Phone, Heart } from 'lucide-react'
import { fetchVehicle } from '../features/vehicles/vehicleService'
import VehicleCard from '../features/vehicles/VehicleCard'
import InquiryForm from '../features/inquiries/InquiryForm'
import { formatLKR, formatKm } from '../utils/format'
import { BUSINESS, ASSETS } from '../utils/constants'
import { usePageTitle } from '../hooks/usePageTitle'
import { useFavorites } from '../features/favorites/FavoritesContext'

const STATUS_LABEL = { available: 'Available', reserved: 'Reserved', sold: 'Sold' }

export default function VehicleDetails() {
  const { id } = useParams()
  const [state, setState] = useState({ status: 'loading' })
  const [img, setImg] = useState(0)

  useEffect(() => {
    let active = true
    setState({ status: 'loading' }); setImg(0)
    fetchVehicle(id)
      .then((r) => active && setState({ status: 'ok', v: r.data, related: r.related }))
      .catch((e) => active && setState({ status: e.response?.status === 404 ? 'missing' : 'error' }))
    return () => { active = false }
  }, [id])

  const v = state.v
  const { isFavorite, toggleFavorite } = useFavorites()
  const favored = isFavorite(v?._id)
  usePageTitle(v ? `${v.title} | TS SALES MART` : 'Vehicle | TS SALES MART')

  if (state.status === 'loading') return <div className="container-page py-20 text-muted">Loading…</div>
  if (state.status !== 'ok')
    return (
      <div className="container-page py-20 text-center">
        <h1 className="section-title">{state.status === 'missing' ? 'Vehicle not found' : 'Something went wrong'}</h1>
        <Link to="/vehicles" className="btn-primary mt-6">Browse vehicles</Link>
      </div>
    )

  const images = v.images?.length ? v.images.map((i) => i.url) : [ASSETS.logo]
  const specs = [
    ['Brand', v.brand], ['Model', v.model], ['Year', v.year], ['Mileage', formatKm(v.mileage)],
    ['Fuel type', v.fuelType], ['Transmission', v.transmission],
    ['Engine capacity', v.engineCapacity ? `${v.engineCapacity} cc` : null],
    ['Condition', v.condition === 'new' ? 'New' : 'Pre-owned'], ['Colour', v.colour],
    ['Seats', v.seats], ['Location', v.location],
  ].filter(([, val]) => val)

  return (
    <div className="container-page py-10">
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-surface">
            <img src={images[img]} alt={`${v.title} photo ${img + 1}`} className={`h-full w-full ${v.images?.length ? 'object-cover' : 'object-contain p-12'}`}
              onError={(e) => { e.currentTarget.src = ASSETS.logo }} />
          </div>
          {images.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {images.map((src, i) => (
                <button key={src + i} onClick={() => setImg(i)} aria-label={`Show photo ${i + 1}`} className={`h-20 w-28 shrink-0 overflow-hidden rounded-lg border-2 ${i === img ? 'border-brand' : 'border-transparent'}`}>
                  <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
          <h2 className="mt-8 font-display text-2xl font-bold uppercase">Specifications</h2>
          <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-gray-200 bg-gray-200 sm:grid-cols-3">
            {specs.map(([k, val]) => (
              <div key={k} className="bg-white p-4"><dt className="text-xs text-muted">{k}</dt><dd className="font-semibold">{val}</dd></div>
            ))}
          </dl>
          {v.description && (<><h2 className="mt-8 font-display text-2xl font-bold uppercase">Description</h2><p className="mt-3 whitespace-pre-line text-gray-700">{v.description}</p></>)}
        </div>

        <aside className="space-y-5 lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-2xl border border-gray-200 p-6 shadow-sm bg-white">
            <div className="flex items-center justify-between">
              <span className={`badge ${v.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>{STATUS_LABEL[v.status]}</span>
              <button
                type="button"
                onClick={() => toggleFavorite(v)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border transition cursor-pointer ${
                  favored ? 'border-brand bg-brand/10 text-brand' : 'border-gray-200 text-gray-600 hover:text-brand hover:border-gray-300'
                }`}
              >
                <Heart size={14} className={favored ? 'fill-brand text-brand' : ''} />
                {favored ? 'Saved' : 'Save'}
              </button>
            </div>
            <h1 className="mt-3 text-2xl font-extrabold">{v.title}</h1>
            <p className="mt-1 text-3xl font-extrabold text-brand">{formatLKR(v.price)}</p>
            <div className="mt-5 space-y-2">
              {BUSINESS.phones.map((p) => <a key={p.href} href={p.href} className="btn-primary w-full"><Phone size={16} />Call Now {p.display}</a>)}
            </div>
          </div>
          {v.status !== 'sold' && (
            <div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h2 className="mb-3 font-display text-xl font-bold uppercase">Send Inquiry</h2>
              <InquiryForm vehicle={v._id} defaultMessage={`I am interested in the ${v.title}.`} />
            </div>
          )}
        </aside>
      </div>

      {!!state.related?.length && (
        <section className="mt-16" aria-labelledby="rel-h">
          <h2 id="rel-h" className="section-title">Related Vehicles</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{state.related.map((r) => <VehicleCard key={r._id} vehicle={r} />)}</div>
        </section>
      )}
    </div>
  )
}
