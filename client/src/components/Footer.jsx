import { Link } from 'react-router-dom'
import { Phone, MapPin, Clock, MessageSquare, Heart, Shield } from 'lucide-react'
import { ASSETS, BUSINESS, NAV_LINKS } from '../utils/constants'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-[#09090b] text-gray-400 border-t border-neutral-800">
      {/* Upper Main Footer Grid */}
      <div className="container-page py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-12">
        {/* Dealership Branding & Identity */}
        <div className="lg:col-span-4 space-y-4">
          <Link to="/" className="inline-block rounded-2xl bg-white p-3 shadow-md hover:opacity-95 transition">
            <img
              src={ASSETS.logo}
              alt="TS SALES MART — Drive Your Dreams"
              className="h-16 sm:h-20 w-auto object-contain"
              loading="lazy"
            />
          </Link>
          <div>
            <p className="font-display text-xl font-extrabold uppercase text-white tracking-wide">
              TS SALES MART
            </p>
            <p className="text-xs font-semibold text-brand tracking-widest uppercase">
              Drive Your Dreams · உங்களின் கனவு வாகனங்களுக்கு
            </p>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
            Automobile dealership in Uduvil, Chunnakam, Sri Lanka. Offering inspected new and verified pre-owned Japanese cars, passenger vans, and commercial vehicles.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <a
              href={BUSINESS.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#25D366] text-white px-3.5 py-2 text-xs font-bold hover:bg-[#20ba59] transition shadow-sm"
            >
              <MessageSquare size={14} /> WhatsApp Us
            </a>
            <Link
              to="/favorites"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 text-gray-200 px-3.5 py-2 text-xs font-semibold hover:border-brand hover:text-white transition"
            >
              <Heart size={14} className="text-brand" /> My Favourites
            </Link>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="font-display text-sm font-extrabold uppercase text-white tracking-wider border-b border-white/10 pb-2">
            Navigation
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="hover:text-brand transition flex items-center gap-1.5">
                  <span className="text-brand">›</span> {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/login" className="hover:text-brand transition flex items-center gap-1.5">
                <span className="text-brand">›</span> Account / Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Popular Categories & Brands */}
        <div className="lg:col-span-3 space-y-3">
          <h3 className="font-display text-sm font-extrabold uppercase text-white tracking-wider border-b border-white/10 pb-2">
            Vehicle Brands
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <Link to="/vehicles?brand=Toyota" className="hover:text-brand transition flex items-center gap-1.5">
                <span className="text-brand">›</span> Toyota Cars &amp; Vans
              </Link>
            </li>
            <li>
              <Link to="/vehicles?brand=Suzuki" className="hover:text-brand transition flex items-center gap-1.5">
                <span className="text-brand">›</span> Suzuki Hybrid Lineup
              </Link>
            </li>
            <li>
              <Link to="/vehicles?brand=Nissan" className="hover:text-brand transition flex items-center gap-1.5">
                <span className="text-brand">›</span> Nissan Vehicles
              </Link>
            </li>
            <li>
              <Link to="/vehicles?type=van" className="hover:text-brand transition flex items-center gap-1.5">
                <span className="text-brand">›</span> Passenger &amp; Commercial Vans
              </Link>
            </li>
            <li>
              <Link to="/vehicles?condition=new" className="hover:text-brand transition flex items-center gap-1.5">
                <span className="text-brand">›</span> Brand New Stock
              </Link>
            </li>
          </ul>
        </div>

        {/* Showroom Contact Details */}
        <div className="lg:col-span-3 space-y-3">
          <h3 className="font-display text-sm font-extrabold uppercase text-white tracking-wider border-b border-white/10 pb-2">
            Showroom Contact
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="text-brand shrink-0 mt-0.5" />
              <div>
                <a
                  href={BUSINESS.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition leading-snug"
                >
                  {BUSINESS.address}
                </a>
                <span className="block text-[11px] text-gray-500 mt-0.5">Click for Google Maps</span>
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <Clock size={16} className="text-brand shrink-0 mt-0.5" />
              <div>
                <span className="text-gray-300 font-semibold">{BUSINESS.hours}</span>
                <span className="block text-[11px] text-gray-500">Sunday by appointment</span>
              </div>
            </li>

            <li className="pt-1 space-y-1.5">
              {BUSINESS.phones.map((p) => (
                <a
                  key={p.href}
                  href={p.href}
                  className="flex items-center gap-2 font-bold text-gray-200 hover:text-brand transition"
                >
                  <Phone size={13} className="text-brand" />
                  {p.display}
                </a>
              ))}
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright and Legal Bar */}
      <div className="border-t border-white/10 py-5 bg-black/60 text-xs text-gray-500">
        <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>© {YEAR} <strong>TS SALES MART</strong>. All rights reserved. Drive Your Dreams.</p>
          <div className="flex items-center gap-3 text-[11px]">
            <span>Uduvil, Chunnakam, Sri Lanka</span>
            <span>•</span>
            <Link to="/contact" className="hover:text-gray-300">Contact Team</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
