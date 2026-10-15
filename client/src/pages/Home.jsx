import { useState } from 'react'
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
  Search,
  Users,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  Maximize2,
} from 'lucide-react'
import QuickSearch from '../features/vehicles/QuickSearch'
import VehicleGrid from '../features/vehicles/VehicleGrid'
import ImageLightbox from '../components/ImageLightbox'
import { ASSETS, BUSINESS } from '../utils/constants'
import { usePageTitle } from '../hooks/usePageTitle'

const CATEGORIES = [
  { label: 'Cars', count: 'Sedans & Hatchbacks', icon: Car, to: '/vehicles?type=car' },
  { label: 'Passenger Vans', count: 'Family & VIP Travel', icon: Bus, to: '/vehicles?type=van&category=passenger' },
  { label: 'Commercial Vans', count: 'Cargo & Logistics', icon: Truck, to: '/vehicles?type=van&category=commercial' },
  { label: 'SUVs & Crossovers', count: '4x4 & Compact SUVs', icon: Mountain, to: '/vehicles?type=suv' },
  { label: 'Brand New', count: 'Latest 2024-2025 Imports', icon: Sparkles, to: '/vehicles?condition=new' },
  { label: 'Pre-Owned', count: 'Inspected Quality', icon: BadgeCheck, to: '/vehicles?condition=used' },
]

const POPULAR_BRANDS = [
  { name: 'Toyota', models: 'Raize, Hilux, HiAce, Roomy', to: '/vehicles?brand=Toyota' },
  { name: 'Suzuki', models: 'Wagon R, Fronx, Swift, Jimny', to: '/vehicles?brand=Suzuki' },
  { name: 'Honda', models: 'Vezel, Fit, Grace, Civic', to: '/vehicles?brand=Honda' },
  { name: 'Nissan', models: 'Magnite, Caravan, X-Trail', to: '/vehicles?brand=Nissan' },
]

const SERVICES = [
  {
    icon: Car,
    title: 'New & Pre-Owned Sales',
    text: 'Extensive showroom inventory of genuine Japanese cars, vans, and SUVs suited for personal or commercial use.',
  },
  {
    icon: Search,
    title: 'Transparent Inspection',
    text: 'Every vehicle is verified with accurate mileage in km, engine condition, and clear history records.',
  },
  {
    icon: Handshake,
    title: 'Buy, Sell & Exchange',
    text: 'Hassle-free trade-in options with fair market valuations for your existing car or van in Sri Lanka.',
  },
  {
    icon: Users,
    title: 'Dedicated Showroom Support',
    text: 'Friendly assistance from our Chunnakam team to guide you through registration, insurance, and ownership transfer.',
  },
]

const POSTERS = [ASSETS.poster1, ASSETS.poster2]

export default function Home() {
  usePageTitle('TS SALES MART — Drive Your Dreams | Premium Car & Van Showroom Sri Lanka')
  const [lightbox, setLightbox] = useState(null)

  return (
    <>
      {/* Premium Automotive Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0c0c0e] via-[#121216] to-[#0c0c0e] text-white">
        {/* Ambient lighting effects */}
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-brand/20 blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 -bottom-32 h-80 w-80 rounded-full bg-red-950/30 blur-3xl pointer-events-none" />

        <div className="container-page relative grid items-center gap-10 py-16 pb-24 lg:grid-cols-12 lg:py-24 lg:pb-32">
          {/* Hero Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 px-4 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-brand animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-200">
                உங்களின் கனவு வாகனங்களுக்கு · Drive Your Dreams
              </span>
            </div>

            <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.92] sm:text-6xl lg:text-7xl tracking-tight">
              Find Your Dream <br />
              <span className="text-brand">Car</span> or <span className="text-white">Van</span>
            </h1>

            <p className="max-w-xl text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
              Explore trusted new and pre-owned automobiles in Sri Lanka. From fuel-efficient family cars to durable commercial vans, TS SALES MART delivers certified quality and unbeatable value.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/vehicles" className="btn-primary !px-7 !py-3.5 text-base">
                Explore Vehicles <ArrowRight size={17} />
              </Link>
              <a
                href={BUSINESS.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp !px-6 !py-3.5 text-base"
              >
                <MessageCircle size={18} /> WhatsApp Us
              </a>
              <Link to="/contact" className="btn-outline !px-5 !py-3.5 text-base">
                Contact Showroom
              </Link>
            </div>

            {/* Quick Trust Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-brand shrink-0" />
                <span>Showroom in Chunnakam</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-brand shrink-0" />
                <span>Transparent LKR Pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-brand shrink-0" />
                <span>Buy &amp; Exchange Support</span>
              </div>
            </div>
          </div>

          {/* Hero Right Column: Official Visual Presentation */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div
                onClick={() => setLightbox(0)}
                className="group relative overflow-hidden rounded-3xl border-2 border-white/15 bg-neutral-900 shadow-2xl shadow-black/80 cursor-pointer"
              >
                <img
                  src={ASSETS.poster1}
                  alt="TS SALES MART Showroom selection of cars and vans in Sri Lanka"
                  className="h-full w-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                    <Maximize2 size={13} /> View Official Poster
                  </span>
                </div>
              </div>

              {/* Floating Showroom Badge */}
              <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-6 rounded-2xl bg-neutral-900/95 border border-white/15 p-4 shadow-2xl backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand text-white shadow-lg">
                    <Car size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">TS SALES MART</p>
                    <p className="text-sm font-extrabold text-white">Cars &amp; Vans Dealership</p>
                    <p className="text-[11px] text-green-400 font-semibold flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> Showroom Ready
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Search Floating Box */}
      <div className="container-page">
        <QuickSearch />
      </div>

      {/* Popular Japanese Brands Quick Bar */}
      <section className="container-page py-12">
        <div className="rounded-2xl border border-gray-200/80 bg-surface p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/70 pb-5">
            <div>
              <p className="eyebrow">Leading Manufacturers</p>
              <h2 className="font-display text-2xl font-bold uppercase mt-1">Featured Automobile Brands</h2>
            </div>
            <Link to="/vehicles" className="text-sm font-bold text-brand hover:underline">
              View All Brands →
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {POPULAR_BRANDS.map((b) => (
              <Link
                key={b.name}
                to={b.to}
                className="group rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:-translate-y-1 hover:border-brand hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl font-extrabold uppercase text-ink group-hover:text-brand transition">
                    {b.name}
                  </span>
                  <ArrowRight size={15} className="text-gray-300 group-hover:text-brand group-hover:translate-x-1 transition" />
                </div>
                <p className="mt-1 text-xs text-muted truncate">{b.models}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Categories Grid */}
      <section className="container-page py-10" aria-labelledby="cat-h">
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow">Find Your Perfect Match</p>
            <h2 id="cat-h" className="section-title mt-1">Browse By Category</h2>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map(({ label, count, icon: Icon, to }) => (
            <Link
              key={label}
              to={to}
              className="group flex flex-col justify-between rounded-2xl border border-gray-200/90 bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-brand hover:shadow-xl"
            >
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-surface text-ink transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:shadow-lg group-hover:shadow-red-950/20">
                <Icon size={26} />
              </div>
              <div className="mt-4">
                <span className="block text-sm font-bold text-ink group-hover:text-brand transition">{label}</span>
                <span className="block text-[11px] text-muted mt-0.5">{count}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Inventory Section */}
      <section className="bg-surface py-16" aria-labelledby="feat-h">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Showroom Collection</p>
              <h2 id="feat-h" className="section-title mt-1">Featured Vehicles</h2>
              <p className="text-sm text-muted mt-1">Hand-picked selection of top vehicles available for immediate purchase.</p>
            </div>
            <Link to="/vehicles?featured=true" className="btn-outline-dark !py-2 text-xs self-start sm:self-auto">
              View All Featured →
            </Link>
          </div>

          <div className="mt-8">
            <VehicleGrid
              params={{ featured: true, limit: 6 }}
              emptyText="Featured vehicles will appear here once published from the admin dashboard."
            />
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="container-page py-16" aria-labelledby="new-h">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Latest In Showroom</p>
            <h2 id="new-h" className="section-title mt-1">New Arrivals</h2>
            <p className="text-sm text-muted mt-1">The most recent cars and vans added to our inventory.</p>
          </div>
          <Link to="/vehicles?sort=newest" className="btn-outline-dark !py-2 text-xs self-start sm:self-auto">
            View All Recent Stock →
          </Link>
        </div>

        <div className="mt-8">
          <VehicleGrid
            params={{ sort: 'newest', limit: 3 }}
            emptyText="New arrivals will appear here once published from the admin dashboard."
          />
        </div>
      </section>

      {/* Special Showcase Banner highlighting Brand Identity & Posters */}
      <section className="container-page py-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 p-8 sm:p-14 text-white border border-neutral-800 shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <span className="badge bg-brand text-white font-bold tracking-wider uppercase">
              Special Showcase · சிறப்பு விற்பனை
            </span>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-wide">
              உங்களின் கனவு வாகனங்களுக்கு <br />
              <span className="text-brand">Drive Your Dreams</span>
            </h2>
            <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed">
              Looking for popular models like the <strong>Toyota Raize</strong>, <strong>Suzuki Wagon R Custom Z</strong>, <strong>Toyota Hilux Rocco</strong>, or <strong>Toyota HiAce Highroof</strong>? Explore our verified stock or talk directly with our sales team.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to="/vehicles?brand=Toyota" className="btn-primary !py-2.5 text-xs sm:text-sm">
                Toyota Vehicles
              </Link>
              <Link to="/vehicles?brand=Suzuki" className="btn-outline !py-2.5 text-xs sm:text-sm">
                Suzuki Vehicles
              </Link>
              <Link to="/vehicles?type=van" className="btn-outline !py-2.5 text-xs sm:text-sm">
                Vans &amp; Commercial
              </Link>
              <a
                href={BUSINESS.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp !py-2.5 text-xs sm:text-sm"
              >
                <MessageCircle size={15} /> Inquire on WhatsApp
              </a>
            </div>
          </div>
          <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-brand/20 blur-3xl pointer-events-none" />
        </div>
      </section>

      {/* Why Choose TS SALES MART */}
      <section className="bg-ink py-20 text-white" aria-labelledby="why-h">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">Trust &amp; Transparency</p>
            <h2 id="why-h" className="section-title mt-1 text-white">Why Choose TS SALES MART?</h2>
            <p className="text-gray-400 text-sm mt-2">
              We focus on building long-lasting trust with vehicle buyers through honest representation and high-caliber customer service.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/5 p-7 transition-all duration-300 hover:border-brand hover:bg-white/10 hover:-translate-y-1"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand/10 border border-brand/30 text-brand mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit or Contact Showroom Section */}
      <section className="container-page py-16" aria-labelledby="contact-h">
        <div className="grid gap-8 rounded-3xl bg-surface border border-gray-200/80 p-8 sm:p-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="eyebrow">Showroom Location</p>
            <h2 id="contact-h" className="section-title mt-1">Visit TS SALES MART Today</h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              Our showroom is conveniently situated in Uduvil, Chunnakam. Drop by to inspect our vehicles in person or speak directly with our experienced vehicle specialists.
            </p>
            <div className="pt-2">
              <p className="flex items-start gap-2.5 font-semibold text-gray-900">
                <MapPin className="mt-0.5 shrink-0 text-brand" size={19} />
                <span>{BUSINESS.address}</span>
              </p>
              <p className="text-xs text-muted mt-1 ml-7">Operating Hours: {BUSINESS.hours}</p>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-3">
            {BUSINESS.phones.map((p) => (
              <a
                key={p.href}
                href={p.href}
                className="btn-primary w-full !py-3 text-sm justify-between px-5"
              >
                <span className="flex items-center gap-2">
                  <Phone size={16} /> Direct Call
                </span>
                <span className="font-bold">{p.display}</span>
              </a>
            ))}
            <a
              href={BUSINESS.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp w-full !py-3 text-sm"
            >
              <MessageCircle size={18} /> Chat with us on WhatsApp
            </a>
            <a
              href={BUSINESS.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-outline-dark w-full !py-3 text-sm"
            >
              <MapPin size={16} /> Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Fullscreen Poster Lightbox */}
      {lightbox !== null && (
        <ImageLightbox
          images={POSTERS}
          currentIndex={lightbox}
          onClose={() => setLightbox(null)}
          onIndexChange={setLightbox}
        />
      )}
    </>
  )
}
