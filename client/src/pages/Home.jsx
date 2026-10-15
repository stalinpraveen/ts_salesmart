import { Link } from 'react-router-dom'
import {
  Car,
  Truck,
  Bus,
  Mountain,
  Sparkles,
  BadgeCheck,
  Phone,
  MapPin,
  ArrowRight,
  Handshake,
  Users,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Compass,
} from 'lucide-react'
import QuickSearch from '../features/vehicles/QuickSearch'
import VehicleGrid from '../features/vehicles/VehicleGrid'
import { ASSETS, BUSINESS } from '../utils/constants'
import { usePageTitle } from '../hooks/usePageTitle'

const CATEGORIES = [
  { label: 'Cars', desc: 'Sedans & Hatchbacks', icon: Car, to: '/vehicles?type=car' },
  { label: 'Passenger Vans', desc: 'Family & Group Travel', icon: Bus, to: '/vehicles?type=van&category=passenger' },
  { label: 'Commercial Vans', desc: 'Cargo & Business Work', icon: Truck, to: '/vehicles?type=van&category=commercial' },
  { label: 'SUVs & Jeeps', desc: 'Compact & Full-size SUVs', icon: Mountain, to: '/vehicles?type=suv' },
  { label: 'Brand New', desc: 'Direct Unregistered Stock', icon: Sparkles, to: '/vehicles?condition=new' },
  { label: 'Pre-Owned', desc: 'Inspected Used Vehicles', icon: BadgeCheck, to: '/vehicles?condition=used' },
]

const SERVICES = [
  {
    icon: Car,
    title: 'New & Pre-Owned Vehicles',
    text: 'Curated selection of popular Japanese models from Toyota, Suzuki, Honda, and Nissan.',
  },
  {
    icon: ShieldCheck,
    title: 'Transparent Inspection',
    text: 'Clear verification of vehicle mileage, manufacturing year, condition, and specifications.',
  },
  {
    icon: Handshake,
    title: 'Buy, Sell or Exchange',
    text: 'Fair evaluation and convenient trade-in options for your existing automobile.',
  },
  {
    icon: Users,
    title: 'Dedicated Guidance',
    text: 'Direct assistance from our experienced dealership team in Uduvil, Chunnakam.',
  },
]

export default function Home() {
  usePageTitle('TS SALES MART — Drive Your Dreams | Luxury & Everyday Cars & Vans in Sri Lanka')

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#09090b] text-white pt-10 pb-24 lg:pt-16 lg:pb-36">
        {/* Subtle Ambient Red Glow Effects */}
        <div
          className="absolute -top-40 right-0 w-[550px] h-[550px] rounded-full bg-brand/15 blur-[120px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-red-900/10 blur-[100px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="container-page relative z-10 grid items-center gap-12 lg:grid-cols-12">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-gray-300 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-brand animate-ping" />
              <span>Official Automobile Dealership · Uduvil, Chunnakam</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase leading-[0.92] tracking-tight">
                Find Your Dream <br />
                <span className="bg-gradient-to-r from-red-500 via-rose-500 to-red-600 bg-clip-text text-transparent">
                  Car or Van
                </span>
              </h1>
              <p className="text-sm sm:text-base font-semibold text-gray-400 tracking-wider">
                உங்களின் கனவு வாகனங்களுக்கு · Drive Your Dreams
              </p>
            </div>

            <p className="max-w-xl text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
              Explore trusted new and verified pre-owned cars and vans in Sri Lanka. Inspected Japanese models, transparent pricing in LKR, and reliable vehicle trade options.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link to="/vehicles" className="btn-primary !px-7 !py-3.5 text-sm font-bold shadow-xl shadow-red-900/30">
                Explore Showroom <ArrowRight size={17} />
              </Link>
              <Link to="/contact" className="btn-outline !px-6 !py-3.5 text-sm font-semibold">
                Contact Dealership
              </Link>
            </div>

            {/* Key Value Guarantee Points */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-400">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 size={14} className="text-brand shrink-0" /> Inspected Quality
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 size={14} className="text-brand shrink-0" /> Transparent LKR Pricing
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 size={14} className="text-brand shrink-0" /> Chunnakam Showroom
              </span>
            </div>
          </div>

          {/* Right Hero Vehicle Image */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-neutral-900 shadow-2xl shadow-black/80 ring-1 ring-white/10 group">
              <img
                src={ASSETS.hero}
                alt="TS SALES MART Automobile Showroom"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
                <div>
                  <p className="text-xs uppercase font-extrabold tracking-widest text-brand">Showroom Selection</p>
                  <p className="text-sm font-bold text-gray-200">New &amp; Pre-Owned Cars &amp; Vans</p>
                </div>
                <Link to="/vehicles" className="rounded-xl bg-white/20 backdrop-blur-md px-3 py-1.5 text-xs font-bold hover:bg-white hover:text-black transition">
                  Browse →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Quick Search Section */}
      <div className="container-page">
        <QuickSearch />
      </div>

      {/* Vehicle Categories Grid */}
      <section className="container-page py-20" aria-labelledby="cat-h">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="eyebrow">Explore Inventory</p>
            <h2 id="cat-h" className="section-title mt-1">Vehicle Categories</h2>
          </div>
          <Link to="/vehicles" className="text-xs font-bold text-brand hover:underline flex items-center gap-1">
            Browse All Categories <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map(({ label, desc, icon: Icon, to }) => (
            <Link
              key={label}
              to={to}
              className="group flex flex-col justify-between rounded-2xl border border-neutral-200/90 bg-white p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-xl hover:shadow-black/5"
            >
              <div>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-neutral-100 text-neutral-800 transition-colors duration-200 group-hover:bg-brand group-hover:text-white">
                  <Icon size={24} />
                </span>
                <h3 className="mt-4 text-sm font-bold text-neutral-900 group-hover:text-brand transition-colors">
                  {label}
                </h3>
                <p className="mt-1 text-[11px] text-neutral-500 leading-tight">
                  {desc}
                </p>
              </div>
              <span className="mt-4 text-[11px] font-bold text-brand flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                View <ArrowRight size={11} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Vehicles Section */}
      <section className="bg-neutral-100/70 py-20 border-y border-neutral-200/60" aria-labelledby="feat-h">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="eyebrow">Hand-Picked Quality</p>
              <h2 id="feat-h" className="section-title mt-1">Featured Vehicles</h2>
              <p className="mt-1 text-sm text-neutral-600">
                Explore our spotlight selection of verified cars and vans ready for immediate inspection.
              </p>
            </div>
            <Link to="/vehicles" className="btn-outline-dark !py-2.5 text-xs font-bold">
              View Full Inventory →
            </Link>
          </div>

          <VehicleGrid
            params={{ featured: true, limit: 6 }}
            emptyText="Featured vehicles will appear here once inventory is published from the staff dashboard."
          />
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="container-page py-20" aria-labelledby="new-h">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="eyebrow">Latest In Showroom</p>
            <h2 id="new-h" className="section-title mt-1">New Arrivals</h2>
            <p className="mt-1 text-sm text-neutral-600">
              The newest vehicle stock recently listed at TS SALES MART.
            </p>
          </div>
          <Link to="/vehicles?sort=newest" className="text-xs font-bold text-brand hover:underline flex items-center gap-1">
            See All New Arrivals <ArrowRight size={13} />
          </Link>
        </div>

        <VehicleGrid
          params={{ sort: 'newest', limit: 3 }}
          emptyText="New vehicle arrivals will appear here once listings are added."
        />
      </section>

      {/* Special Showcase Banner highlighting Brand Identity & Models */}
      <section className="container-page pb-12">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-neutral-950 via-[#111115] to-neutral-950 p-8 sm:p-14 text-white border border-neutral-800 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="badge bg-brand text-white font-bold tracking-wider uppercase text-xs">
              Special Showcase · சிறப்பு விற்பனை
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-wide leading-tight">
              உங்களின் கனவு வாகனங்களுக்கு <br />
              <span className="text-brand">Drive Your Dreams</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Looking for leading Japanese models like the <strong>Toyota Raize</strong>, <strong>Suzuki Wagon R Custom Z</strong>, <strong>Toyota Hilux Rocco</strong>, or <strong>Toyota HiAce Highroof</strong>? Explore our verified stock or talk directly with our sales team.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link to="/vehicles?brand=Toyota" className="btn-primary !py-2.5 text-xs sm:text-sm">
                Toyota Vehicles
              </Link>
              <Link to="/vehicles?brand=Suzuki" className="btn-outline !py-2.5 text-xs sm:text-sm">
                Suzuki Vehicles
              </Link>
              <Link to="/vehicles?type=van" className="btn-outline !py-2.5 text-xs sm:text-sm">
                Cars &amp; Vans
              </Link>
            </div>
          </div>
          <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-brand/20 blur-3xl pointer-events-none" />
        </div>
      </section>

      {/* Why Choose TS SALES MART */}
      <section className="bg-[#09090b] py-20 text-white border-t border-neutral-800" aria-labelledby="why-h">
        <div className="container-page">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="eyebrow justify-center">The Dealership Advantage</p>
            <h2 id="why-h" className="section-title mt-2 text-white">Why Choose TS SALES MART?</h2>
            <p className="mt-3 text-sm text-gray-400">
              We focus on honest customer advice, inspected automobile quality, and dependable service in Chunnakam.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/5 p-7 transition-all duration-300 hover:border-brand hover:bg-white/[0.08] hover:-translate-y-1"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand/10 border border-brand/20 text-brand">
                  <Icon size={24} />
                </div>
                <h3 className="mt-5 text-base font-bold text-white">{title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-gray-400 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dealership Visit & Contact Section */}
      <section className="container-page py-20" aria-labelledby="contact-h">
        <div className="grid gap-10 rounded-3xl border border-neutral-200/90 bg-white p-8 sm:p-12 lg:grid-cols-12 shadow-xl shadow-black/5 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="eyebrow">Showroom Location</p>
            <h2 id="contact-h" className="section-title mt-1">Visit TS SALES MART</h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              We welcome you to visit our physical showroom in Uduvil to inspect vehicles, test features, and discuss purchasing or exchange arrangements in person.
            </p>
            <div className="pt-2 space-y-2.5 text-sm text-gray-700">
              <p className="flex items-start gap-2.5 font-medium">
                <MapPin className="mt-0.5 shrink-0 text-brand" size={18} />
                <span>{BUSINESS.address}</span>
              </p>
              <p className="flex items-center gap-2.5 font-medium">
                <Clock className="shrink-0 text-brand" size={17} />
                <span>Operating Hours: {BUSINESS.hours} (Sunday by appointment)</span>
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-3 justify-center">
            {BUSINESS.phones.map((p) => (
              <a key={p.href} href={p.href} className="btn-primary !py-3.5 text-sm font-bold justify-start px-6">
                <Phone size={16} /> Call Hotline: {p.display}
              </a>
            ))}
            <a
              href={BUSINESS.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-outline-dark !py-3.5 text-sm font-bold justify-start px-6"
            >
              <Compass size={16} /> Get Driving Directions on Google Maps
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
