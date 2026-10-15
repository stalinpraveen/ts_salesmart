import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Car,
  Bus,
  Mountain,
  Sparkles,
  BadgeCheck,
  Phone,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  Handshake,
  Users,
  ShieldCheck,
  Clock,
  Compass,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import QuickSearch from '../features/vehicles/QuickSearch'
import VehicleGrid from '../features/vehicles/VehicleGrid'
import { ASSETS, BUSINESS } from '../utils/constants'
import { usePageTitle } from '../hooks/usePageTitle'

const CATEGORIES = [
  { label: 'Cars', desc: 'Sedans & Hatchbacks', icon: Car, to: '/vehicles?type=car', badge: 'Popular' },
  { label: 'Vans', desc: 'Family & Commercial Work', icon: Bus, to: '/vehicles?type=van', badge: 'Spacious' },
  { label: 'SUVs & Jeeps', desc: 'Crossovers & All-Terrain', icon: Mountain, to: '/vehicles?type=suv', badge: 'Premium' },
  { label: 'New Arrivals', desc: 'Recently Listed Stock', icon: Sparkles, to: '/vehicles?sort=newest', badge: 'Latest' },
  { label: 'Pre-Owned', desc: 'Inspected Used Vehicles', icon: BadgeCheck, to: '/vehicles?condition=used', badge: 'Verified' },
]

const SERVICES = [
  {
    icon: Car,
    title: 'Curated Japanese Selection',
    text: 'Hand-picked new and pre-owned models from Toyota, Suzuki, Honda, and Nissan tailored to Sri Lankan roads.',
  },
  {
    icon: ShieldCheck,
    title: 'Transparent Inspection',
    text: 'Genuine mileage verification, clear manufacturing year, and complete documentation on every car and van.',
  },
  {
    icon: Handshake,
    title: 'Buy, Sell or Exchange',
    text: 'Fair evaluation and hassle-free vehicle trade-in options right at our Chunnakam showroom.',
  },
  {
    icon: Users,
    title: 'Dedicated Guidance',
    text: 'Personalized assistance from our experienced sales team to help you choose the right automobile for your budget.',
  },
]

const BRANDS = [
  { name: 'BMW', link: '/vehicles?brand=BMW', color: 'text-neutral-900', font: 'font-display font-black tracking-widest' },
  { name: 'Mercedes-Benz', link: '/vehicles?brand=Mercedes-Benz', color: 'text-neutral-800', font: 'font-sans font-bold tracking-tight' },
  { name: 'Audi', link: '/vehicles?brand=Audi', color: 'text-neutral-900', font: 'font-sans font-bold tracking-wide' },
  { name: 'TOYOTA', link: '/vehicles?brand=Toyota', color: 'text-brand font-black', font: 'font-display tracking-widest font-black' },
  { name: 'LEXUS', link: '/vehicles?brand=Lexus', color: 'text-neutral-900', font: 'font-display font-black tracking-widest' },
  { name: 'SUZUKI', link: '/vehicles?brand=Suzuki', color: 'text-neutral-900', font: 'font-display font-bold tracking-wider' },
  { name: 'NISSAN', link: '/vehicles?brand=Nissan', color: 'text-neutral-900', font: 'font-display font-extrabold tracking-wider' },
]

export default function Home() {
  usePageTitle('TS SALES MART — Drive Your Dream Car | Official Dealership Sri Lanka')
  const [brandOffset, setBrandOffset] = useState(0)

  const nextBrand = () => setBrandOffset((prev) => (prev + 1) % BRANDS.length)
  const prevBrand = () => setBrandOffset((prev) => (prev - 1 + BRANDS.length) % BRANDS.length)

  return (
    <>
      {/* ========================================================= */}
      {/* 1. CINEMATIC HERO SECTION (Accurately Matching Reference) */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-[#09090b] text-white pt-12 pb-28 lg:pt-20 lg:pb-36 border-b border-white/5">
        {/* Subtle Ambient Red Glow */}
        <div
          className="absolute -top-40 right-10 w-[600px] h-[600px] rounded-full bg-brand/15 blur-[140px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="container-page relative z-10 grid items-center gap-10 lg:grid-cols-12">
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-6">
            {/* Red Dash Eyebrow from reference */}
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-[3px] bg-brand inline-block rounded-full" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
                PREMIUM CAR DEALERSHIP
              </span>
            </div>

            {/* Massive Bold Headline: DRIVE YOUR DREAM CAR */}
            <div className="space-y-1">
              <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.92]">
                DRIVE YOUR <br />
                <span className="text-brand">DREAM</span> CAR
              </h1>
              <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase pt-1">
                TS SALES MART · உங்களின் கனவு வாகனங்களுக்கு
              </p>
            </div>

            {/* Supporting Text matching reference */}
            <p className="max-w-lg text-base sm:text-lg text-gray-300 font-normal leading-relaxed">
              Explore our premium collection of vehicles and find the perfect car that matches your lifestyle.
            </p>

            {/* CTA Buttons: View Inventory ↗ & Contact Our Team */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/vehicles"
                className="btn-primary !px-8 !py-4 text-xs font-bold uppercase tracking-wider rounded-xl shadow-xl shadow-red-950/40"
              >
                <span>View Inventory</span>
                <ArrowUpRight size={17} />
              </Link>
              <Link
                to="/contact"
                className="btn-outline !px-8 !py-4 text-xs font-bold uppercase tracking-wider rounded-xl"
              >
                <span>Contact Our Team</span>
              </Link>
            </div>
          </div>

          {/* Right Hero Vehicle Image: Realistic Black Car in Glass Showroom */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black group">
              <img
                src={ASSETS.heroLuxury || ASSETS.hero}
                alt="TS SALES MART Luxury Showroom"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.src = ASSETS.hero
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#09090b]/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. FLOATING SEARCH CONSOLE (Matching Reference Design)     */}
      {/* ========================================================= */}
      <div className="container-page">
        <QuickSearch />
      </div>

      {/* ========================================================= */}
      {/* 3. BRAND SHOWCASE CAROUSEL (White Capsule from Reference)  */}
      {/* ========================================================= */}
      <section className="container-page pt-10 pb-6">
        <div className="rounded-full bg-white shadow-xl shadow-black/5 py-4 px-6 sm:px-10 border border-neutral-200/80 max-w-5xl mx-auto flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={prevBrand}
            aria-label="Previous brand"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-brand hover:text-white transition cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center justify-around gap-6 sm:gap-10 w-full overflow-hidden">
            {BRANDS.map((_, i) => {
              const activeIndex = (i + brandOffset) % BRANDS.length
              const item = BRANDS[activeIndex]
              return (
                <Link
                  key={item.name + i}
                  to={item.link}
                  className={`text-xs sm:text-sm md:text-base font-bold transition hover:opacity-75 ${item.color} ${item.font} shrink-0`}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          <button
            type="button"
            onClick={nextBrand}
            aria-label="Next brand"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-brand hover:text-white transition cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. VEHICLE CATEGORIES                                     */}
      {/* ========================================================= */}
      <section className="container-page py-16" aria-labelledby="cat-h">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="eyebrow">Explore Inventory</p>
            <h2 id="cat-h" className="section-title mt-1">Vehicle Categories</h2>
            <p className="mt-1 text-sm text-neutral-600">
              Browse our diverse inventory categorized to fit your family, business, or lifestyle needs.
            </p>
          </div>
          <Link to="/vehicles" className="text-xs font-bold text-brand hover:underline flex items-center gap-1">
            Browse All Categories <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map(({ label, desc, icon: Icon, to, badge }) => (
            <Link
              key={label}
              to={to}
              className="group flex flex-col justify-between rounded-3xl border border-neutral-200/90 bg-white p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-xl hover:shadow-black/5"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-neutral-100 text-neutral-800 transition-colors duration-200 group-hover:bg-brand group-hover:text-white shadow-xs">
                    <Icon size={24} />
                  </span>
                  <span className="badge bg-neutral-100 text-neutral-600 text-[10px] font-bold uppercase group-hover:bg-brand/10 group-hover:text-brand transition-colors">
                    {badge}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-bold text-neutral-900 group-hover:text-brand transition-colors">
                  {label}
                </h3>
                <p className="mt-1 text-xs text-neutral-500 leading-snug">
                  {desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-neutral-400 group-hover:text-brand transition-colors">
                <span>Explore</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. FEATURED VEHICLES SHOWCASE                             */}
      {/* ========================================================= */}
      <section className="bg-neutral-100/70 py-20 border-y border-neutral-200/60" aria-labelledby="feat-h">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="eyebrow">Spotlight Selection</p>
              <h2 id="feat-h" className="section-title mt-1">Featured Vehicles</h2>
              <p className="mt-1 text-sm text-neutral-600">
                Hand-picked cars and vans verified and ready for immediate inspection at our showroom.
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

      {/* ========================================================= */}
      {/* 6. NEW ARRIVALS                                           */}
      {/* ========================================================= */}
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

      {/* ========================================================= */}
      {/* 7. WHY CHOOSE TS SALES MART                                */}
      {/* ========================================================= */}
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
                className="rounded-3xl border border-white/10 bg-white/5 p-7 transition-all duration-300 hover:border-brand hover:bg-white/[0.08] hover:-translate-y-1"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 border border-brand/20 text-brand">
                  <Icon size={24} />
                </div>
                <h3 className="mt-5 text-base font-bold text-white">{title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-gray-400 leading-relaxed font-normal">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. CONTACT & CALL-TO-ACTION SECTION                       */}
      {/* ========================================================= */}
      <section className="container-page py-20" aria-labelledby="contact-h">
        <div className="grid gap-10 rounded-3xl border border-neutral-200/90 bg-white p-8 sm:p-12 lg:grid-cols-12 shadow-xl shadow-black/5 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="eyebrow">Showroom Location</p>
            <h2 id="contact-h" className="section-title mt-1">Visit TS SALES MART</h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
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
              <a
                key={p.href}
                href={p.href}
                className="btn-primary !py-3.5 text-sm font-bold justify-start px-6 shadow-md shadow-red-950/20"
              >
                <Phone size={16} /> Call Hotline: {p.display}
              </a>
            ))}

            <a
              href={BUSINESS.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="btn !py-3.5 text-sm font-bold justify-start px-6 bg-[#25D366] text-white hover:bg-[#20ba59] transition shadow-xs"
            >
              <MessageSquare size={16} /> Chat on WhatsApp Directly
            </a>

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
