import { Link } from 'react-router-dom'
import { Car, Truck, Bus, Mountain, Sparkles, BadgeCheck, Phone, MapPin, ArrowRight, Handshake, Search, Users } from 'lucide-react'
import QuickSearch from '../features/vehicles/QuickSearch'
import VehicleGrid from '../features/vehicles/VehicleGrid'
import { ASSETS, BUSINESS } from '../utils/constants'
import { usePageTitle } from '../hooks/usePageTitle'

const CATEGORIES = [
  { label: 'Cars', icon: Car, to: '/vehicles?type=car' },
  { label: 'Passenger Vans', icon: Bus, to: '/vehicles?type=van&category=passenger' },
  { label: 'Commercial Vans', icon: Truck, to: '/vehicles?type=van&category=commercial' },
  { label: 'SUVs', icon: Mountain, to: '/vehicles?type=suv' },
  { label: 'New Vehicles', icon: Sparkles, to: '/vehicles?condition=new' },
  { label: 'Pre-owned', icon: BadgeCheck, to: '/vehicles?condition=used' },
]

const SERVICES = [
  { icon: Car, title: 'New & pre-owned vehicles', text: 'Browse cars and vans across a range of popular brands.' },
  { icon: Search, title: 'Vehicle guidance', text: 'Our team can help you find a vehicle that suits your needs and budget.' },
  { icon: Handshake, title: 'Buy, sell or exchange', text: 'Ask us about buying, selling and exchange options.' },
  { icon: Users, title: 'Customer support', text: 'Talk to us by phone or visit us in Uduvil, Chunnakam.' },
]

export default function Home() {
  usePageTitle('TS SALES MART — Drive Your Dreams | Cars & Vans in Sri Lanka')
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand/30 blur-3xl" aria-hidden="true" />
        <div className="container-page relative grid items-center gap-10 py-16 pb-28 lg:grid-cols-2 lg:py-24 lg:pb-32">
          <div>
            <p className="eyebrow">TS SALES MART · Drive Your Dreams</p>
            <h1 className="mt-4 font-display text-5xl font-extrabold uppercase leading-[0.95] sm:text-6xl lg:text-7xl">
              Find Your Dream <span className="text-brand">Car</span> or <span className="text-brand">Van</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-gray-300">Explore quality new and pre-owned vehicles with TS SALES MART.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/vehicles" className="btn-primary">Explore Vehicles <ArrowRight size={16} /></Link>
              <Link to="/contact" className="btn-outline">Contact Our Team</Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[16/10] overflow-hidden rounded-2xl border-4 border-white/10 shadow-2xl shadow-black/50">
              <img src={ASSETS.poster1} alt="Selection of cars and vans sold by TS SALES MART" className="h-full w-full object-cover" style={{ objectPosition: '50% 47%' }} />
            </div>
            <div className="absolute -bottom-5 -left-3 rounded-xl bg-brand px-5 py-3 text-sm font-bold shadow-xl">New & Pre-owned<br />Cars & Vans</div>
          </div>
        </div>
      </section>

      <div className="container-page"><QuickSearch /></div>

      <section className="container-page py-16" aria-labelledby="cat-h">
        <p className="eyebrow">Browse by type</p>
        <h2 id="cat-h" className="section-title mt-1">Vehicle Categories</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map(({ label, icon: Icon, to }) => (
            <Link key={label} to={to} className="group flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 text-center transition hover:-translate-y-1 hover:border-brand hover:shadow-lg">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-surface text-ink transition group-hover:bg-brand group-hover:text-white"><Icon size={26} /></span>
              <span className="mt-3 text-sm font-bold">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-surface py-16" aria-labelledby="feat-h">
        <div className="container-page">
          <div className="flex items-end justify-between">
            <div><p className="eyebrow">Our inventory</p><h2 id="feat-h" className="section-title mt-1">Featured Vehicles</h2></div>
            <Link to="/vehicles" className="hidden text-sm font-semibold text-brand hover:underline sm:block">View all →</Link>
          </div>
          <div className="mt-8"><VehicleGrid params={{ featured: true, limit: 6 }} emptyText="Featured vehicles will appear here once inventory is published." /></div>
        </div>
      </section>

      <section className="container-page py-16" aria-labelledby="new-h">
        <p className="eyebrow">Just listed</p>
        <h2 id="new-h" className="section-title mt-1">New Arrivals</h2>
        <div className="mt-8"><VehicleGrid params={{ sort: 'newest', limit: 3 }} emptyText="New arrivals will appear here once inventory is published." /></div>
      </section>

      <section className="bg-ink py-16 text-white" aria-labelledby="why-h">
        <div className="container-page">
          <p className="eyebrow">Our services</p>
          <h2 id="why-h" className="section-title mt-1">Why Choose TS SALES MART?</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-brand">
                <Icon className="text-brand" size={28} />
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm text-gray-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16" aria-labelledby="contact-h">
        <div className="grid gap-8 rounded-3xl bg-surface p-8 lg:grid-cols-2 lg:p-12">
          <div>
            <p className="eyebrow">Get in touch</p>
            <h2 id="contact-h" className="section-title mt-1">Visit or Call Us</h2>
            <p className="mt-4 flex items-start gap-2 text-gray-700"><MapPin className="mt-1 shrink-0 text-brand" size={18} />{BUSINESS.address}</p>
          </div>
          <div className="flex flex-col justify-center gap-3 sm:flex-row lg:flex-col">
            {BUSINESS.phones.map((p) => <a key={p.href} href={p.href} className="btn-primary"><Phone size={16} />Call {p.display}</a>)}
            <a href={BUSINESS.mapUrl} target="_blank" rel="noreferrer" className="btn-outline-dark"><MapPin size={16} />View on Map</a>
          </div>
        </div>
      </section>
    </>
  )
}
