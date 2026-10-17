import { Link } from 'react-router-dom'
import {
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Heart,
  ShieldCheck,
  ChevronRight,
  ArrowUp,
  Sparkles,
  ExternalLink,
} from 'lucide-react'
import { ASSETS, BUSINESS, NAV_LINKS } from '../utils/constants'

const YEAR = new Date().getFullYear()

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-[#09090b] text-gray-400 border-t border-neutral-800 overflow-hidden">
      {/* Subtle Ambient Red Glow Effects */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-brand/10 blur-[130px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-red-950/15 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* 1. Upper VIP Dealership Concierge Banner */}
      <div className="border-b border-white/10 bg-white/[0.02]">
        <div className="container-page py-10">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-neutral-900/90 via-[#121316] to-neutral-900/90 p-6 sm:p-8 backdrop-blur-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand">
                <Sparkles size={13} />
                <span>TS SALES MART · Chunnakam Showroom Concierge</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-wide">
                Looking For Your Next Vehicle?
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 max-w-xl leading-relaxed">
                Speak directly with our automotive specialists in Uduvil, Chunnakam. We offer honest vehicle advice, clear paperwork verification, and fair trade-in appraisals.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={BUSINESS.phones[0].href}
                className="btn-primary !py-3.5 !px-6 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-red-950/40"
              >
                <Phone size={15} />
                <span>Call Hotline: {BUSINESS.phones[0].display}</span>
              </a>

              <a
                href={BUSINESS.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn !py-3.5 !px-6 text-xs font-bold uppercase tracking-wider rounded-xl bg-[#25D366] text-white hover:bg-[#20ba59] transition shadow-md"
              >
                <MessageSquare size={15} />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main 4-Column Luxury Footer Grid */}
      <div className="container-page py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-12 relative z-10">
        {/* Column 1: Dealership Identity & Brand Showcase */}
        <div className="lg:col-span-4 space-y-5">
          <Link to="/" className="inline-flex items-center gap-3.5 group">
            <div className="rounded-2xl bg-white p-2.5 shadow-md transition-transform duration-300 group-hover:scale-105">
              <img
                src={ASSETS.logo}
                alt="TS SALES MART — Drive Your Dreams"
                className="h-12 sm:h-14 w-auto object-contain"
                loading="lazy"
              />
            </div>
            <div>
              <p className="font-display text-2xl font-black uppercase text-white tracking-wide leading-none">
                TS SALES MART
              </p>
              <p className="text-xs font-bold text-brand uppercase tracking-widest mt-1">
                Drive Your Dreams
              </p>
            </div>
          </Link>

          <p className="text-xs font-semibold text-gray-400 tracking-wider">
            உங்களின் கனவு வாகனங்களுக்கு
          </p>

          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm font-normal">
            Automobile showroom situated in Uduvil, Chunnakam, Sri Lanka. Offering inspected new and verified pre-owned Japanese cars, passenger vans, and commercial vehicles.
          </p>

          {/* Trust Guarantee Chips */}
          <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-semibold text-gray-300">
            <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1">
              <ShieldCheck size={13} className="text-brand" /> Verified Mileage
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1">
              <ShieldCheck size={13} className="text-brand" /> Clear Title Papers
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1">
              <ShieldCheck size={13} className="text-brand" /> Chunnakam Showroom
            </span>
          </div>

          <div className="pt-2">
            <Link
              to="/favorites"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 text-gray-200 px-4 py-2 text-xs font-semibold hover:border-brand hover:text-white transition"
            >
              <Heart size={14} className="text-brand" /> Saved Favourites
            </Link>
          </div>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <span className="w-4 h-[2px] bg-brand inline-block" />
            <h4 className="font-display text-sm font-extrabold uppercase text-white tracking-wider">
              Navigation
            </h4>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className="group flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronRight size={13} className="text-brand transition-transform group-hover:translate-x-1" />
                  <span>{l.label}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/login"
                className="group flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
              >
                <ChevronRight size={13} className="text-brand transition-transform group-hover:translate-x-1" />
                <span>Account &amp; Staff Login</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Vehicle Brands & Categories */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <span className="w-4 h-[2px] bg-brand inline-block" />
            <h4 className="font-display text-sm font-extrabold uppercase text-white tracking-wider">
              Vehicle Makes
            </h4>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm">
            <li>
              <Link
                to="/vehicles?brand=Toyota"
                className="group flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
              >
                <ChevronRight size={13} className="text-brand transition-transform group-hover:translate-x-1" />
                <span>Toyota Cars &amp; Vans</span>
              </Link>
            </li>
            <li>
              <Link
                to="/vehicles?brand=Suzuki"
                className="group flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
              >
                <ChevronRight size={13} className="text-brand transition-transform group-hover:translate-x-1" />
                <span>Suzuki Hybrid Lineup</span>
              </Link>
            </li>
            <li>
              <Link
                to="/vehicles?brand=Nissan"
                className="group flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
              >
                <ChevronRight size={13} className="text-brand transition-transform group-hover:translate-x-1" />
                <span>Nissan Vehicles</span>
              </Link>
            </li>
            <li>
              <Link
                to="/vehicles?type=van"
                className="group flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
              >
                <ChevronRight size={13} className="text-brand transition-transform group-hover:translate-x-1" />
                <span>Passenger &amp; Commercial Vans</span>
              </Link>
            </li>
            <li>
              <Link
                to="/vehicles?condition=new"
                className="group flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
              >
                <ChevronRight size={13} className="text-brand transition-transform group-hover:translate-x-1" />
                <span>Brand New Unregistered Stock</span>
              </Link>
            </li>
            <li>
              <Link
                to="/vehicles?condition=used"
                className="group flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
              >
                <ChevronRight size={13} className="text-brand transition-transform group-hover:translate-x-1" />
                <span>Verified Pre-Owned Cars</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Showroom Concierge & Contact Details */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <span className="w-4 h-[2px] bg-brand inline-block" />
            <h4 className="font-display text-sm font-extrabold uppercase text-white tracking-wider">
              Showroom Contact
            </h4>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {/* Address */}
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5">
              <MapPin size={18} className="text-brand shrink-0 mt-0.5" />
              <div>
                <a
                  href={BUSINESS.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-gray-200 hover:text-white transition leading-snug block"
                >
                  {BUSINESS.address}
                </a>
                <a
                  href={BUSINESS.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold text-brand hover:underline"
                >
                  <span>Google Maps Directions</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5">
              <Clock size={18} className="text-brand shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-200">{BUSINESS.hours}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Sunday visits by telephone appointment</p>
              </div>
            </div>

            {/* Hotlines */}
            <div className="space-y-2 pt-1">
              {BUSINESS.phones.map((p) => (
                <a
                  key={p.href}
                  href={p.href}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 font-bold text-gray-200 hover:border-brand hover:text-white transition"
                >
                  <span className="flex items-center gap-2">
                    <Phone size={13} className="text-brand" /> {p.display}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-gray-500">Call Now</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Legal & Copyright Bar with Back to Top */}
      <div className="border-t border-white/10 pt-6 pb-16 sm:pb-6 bg-black/80 text-xs text-gray-500">
        <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <p>© {YEAR} <strong>TS SALES MART</strong>. All rights reserved. Drive Your Dreams.</p>
            <p className="text-[11px] text-gray-600">
              No. 57, Ampalavanar Road, Uduvil, Chunnakam, Sri Lanka · Hotlines: 077 205 6400 / 076 684 9867
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:text-gray-300 transition text-xs font-semibold">
              Contact Team
            </Link>
            <span>•</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-gray-300 hover:border-brand hover:text-white transition cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
