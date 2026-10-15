import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Phone,
  MapPin,
  ShieldCheck,
  Car,
  Handshake,
  Users,
  MessageCircle,
  Clock,
  HelpCircle,
  ChevronDown,
  Maximize2,
} from 'lucide-react'
import { BUSINESS, ASSETS } from '../utils/constants'
import InquiryForm from '../features/inquiries/InquiryForm'
import { usePageTitle } from '../hooks/usePageTitle'
import { getShowroomStatus } from '../utils/showroomStatus'
import ImageLightbox from '../components/ImageLightbox'

export function PagePlaceholder({ title, children }) {
  usePageTitle(`${title} | TS SALES MART`)
  return (
    <div className="container-page py-20 text-center">
      <h1 className="section-title">{title}</h1>
      <p className="mx-auto mt-4 max-w-md text-muted">{children || 'This page is currently being updated.'}</p>
      <Link to="/" className="btn-primary mt-6">Back to Home</Link>
    </div>
  )
}

export const NotFound = () => <PagePlaceholder title="Page not found">The page you are looking for does not exist.</PagePlaceholder>

export function About() {
  usePageTitle('About Us | TS SALES MART — Drive Your Dreams')
  const [lightboxPoster, setLightboxPoster] = useState(null)
  const posters = [ASSETS.poster1, ASSETS.poster2]

  return (
    <div className="container-page py-14">
      <div className="max-w-3xl">
        <p className="eyebrow">Dealership Profile</p>
        <h1 className="section-title mt-1">About TS SALES MART</h1>
        <p className="mt-2 text-lg font-bold text-brand">Drive Your Dreams · உங்களின் கனவு வாகனங்களுக்கு</p>
        <p className="mt-5 text-gray-700 leading-relaxed text-sm sm:text-base">
          Welcome to <strong>TS SALES MART</strong>, an established automobile dealership situated in Uduvil, Chunnakam, Sri Lanka. We specialize in providing high-quality new and trusted pre-owned vehicles to customers across the Northern Province and island-wide.
        </p>
        <p className="mt-4 text-gray-700 leading-relaxed text-sm sm:text-base">
          From popular compact SUVs like the Toyota Raize and fuel-efficient hatchbacks like the Suzuki Wagon R and Swift, to reliable commercial and passenger vans such as Toyota HiAce, Roomy, and Nissan Caravan, we help you find the vehicle that fits your everyday family or commercial needs.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-surface/50 p-6 shadow-xs">
          <Car className="text-brand" size={28} />
          <h3 className="mt-3 font-bold text-lg text-ink">New &amp; Pre-Owned</h3>
          <p className="mt-2 text-xs sm:text-sm text-muted">Wide selection of leading Japanese models including Toyota, Suzuki, Honda, and Nissan.</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-surface/50 p-6 shadow-xs">
          <ShieldCheck className="text-brand" size={28} />
          <h3 className="mt-3 font-bold text-lg text-ink">Verified Quality</h3>
          <p className="mt-2 text-xs sm:text-sm text-muted">Carefully maintained vehicles with transparent mileage, condition, and vehicle details.</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-surface/50 p-6 shadow-xs">
          <Handshake className="text-brand" size={28} />
          <h3 className="mt-3 font-bold text-lg text-ink">Buy, Sell &amp; Exchange</h3>
          <p className="mt-2 text-xs sm:text-sm text-muted">Convenient trade-in options and honest price evaluations for your current car or van.</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-surface/50 p-6 shadow-xs">
          <Users className="text-brand" size={28} />
          <h3 className="mt-3 font-bold text-lg text-ink">Friendly Guidance</h3>
          <p className="mt-2 text-xs sm:text-sm text-muted">Dedicated support to guide you through vehicle selection, options, registration, and paperwork.</p>
        </div>
      </div>

      {/* Official Promotional Posters Showcase */}
      <div className="mt-16 rounded-3xl bg-ink text-white p-8 sm:p-12 shadow-2xl">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <span className="badge bg-brand text-white font-bold tracking-wider uppercase">
              Official Posters · சிறப்பு விற்பனை
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase mt-3">
              Visit Our Chunnakam Showroom
            </h2>
            <p className="mt-4 text-gray-300 text-sm leading-relaxed">
              Explore our current vehicle lineup in person or contact us directly. Our showroom is conveniently located along Ampalavanar Road in Uduvil, Chunnakam.
            </p>
            <div className="mt-6 space-y-2.5 text-xs sm:text-sm text-gray-300">
              <p className="flex items-center gap-2"><MapPin size={16} className="text-brand shrink-0" /> {BUSINESS.address}</p>
              <p className="flex items-center gap-2"><Clock size={16} className="text-brand shrink-0" /> {BUSINESS.hours}</p>
              {BUSINESS.phones.map((p) => (
                <p key={p.href} className="flex items-center gap-2">
                  <Phone size={16} className="text-brand shrink-0" />
                  <a href={p.href} className="hover:text-white font-semibold">{p.display}</a>
                </p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/vehicles" className="btn-primary !py-2.5 text-xs sm:text-sm">Browse Vehicles</Link>
              <a
                href={BUSINESS.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp !py-2.5 text-xs sm:text-sm"
              >
                <MessageCircle size={16} /> WhatsApp Us
              </a>
            </div>
          </div>

          {/* Posters Grid (Click to Enlarge) */}
          <div className="grid grid-cols-2 gap-4">
            {posters.map((p, idx) => (
              <div
                key={p}
                onClick={() => setLightboxPoster(idx)}
                className="group relative overflow-hidden rounded-2xl border border-white/20 shadow-xl cursor-pointer"
              >
                <img
                  src={p}
                  alt={`TS SALES MART Official Promotional Poster ${idx + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md flex items-center gap-1">
                    <Maximize2 size={13} /> View Poster
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {lightboxPoster !== null && (
        <ImageLightbox
          images={posters}
          currentIndex={lightboxPoster}
          onClose={() => setLightboxPoster(null)}
          onIndexChange={setLightboxPoster}
        />
      )}
    </div>
  )
}

const FAQS = [
  {
    q: 'Can I trade in or exchange my current vehicle?',
    a: 'Yes! TS SALES MART offers convenient buy, sell, and exchange options. Bring your car or van to our Chunnakam showroom for an honest inspection and competitive market valuation.',
  },
  {
    q: 'Do you arrange vehicle leasing & loan facilities in Sri Lanka?',
    a: 'Yes, we assist our customers with leasing and loan facilities through leading commercial banks and registered financial institutions in Sri Lanka, tailored to your budget and tenure.',
  },
  {
    q: 'Can I inspect the vehicles in person before purchasing?',
    a: 'Absolutely. We encourage customers to visit our showroom located at No. 57, Ampalavanar Road, Uduvil, Chunnakam. We will walk you through the vehicle specs, condition, and original documents.',
  },
  {
    q: 'Do you offer island-wide delivery assistance across Sri Lanka?',
    a: 'Yes, while our showroom is in Chunnakam, Jaffna, we regularly cater to customers from Colombo, Kandy, and across all provinces, providing safe vehicle transportation coordination.',
  },
]

export function Contact() {
  usePageTitle('Contact Us | TS SALES MART')
  const showroomStatus = getShowroomStatus()
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div className="container-page py-14">
      <div className="max-w-2xl">
        <p className="eyebrow">Direct Showroom Access</p>
        <h1 className="section-title mt-1">Contact TS SALES MART</h1>
        <p className="mt-2 text-sm sm:text-base text-muted">
          Looking for a specific vehicle, or want to discuss trade-in, leasing, or test drives? Our Chunnakam staff are ready to help.
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        {/* Left Column: Showroom details */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-200 bg-surface p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <h2 className="font-display text-2xl font-bold uppercase text-ink">
                Showroom Details
              </h2>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${showroomStatus.statusClass}`}>
                <span className="h-2 w-2 rounded-full bg-current" />
                {showroomStatus.badgeText}
              </span>
            </div>

            <div className="mt-6 space-y-5 text-sm">
              <div>
                <p className="text-xs font-bold uppercase text-muted">Showroom Address</p>
                <p className="mt-1 flex items-start gap-2 font-semibold text-gray-800">
                  <MapPin className="mt-0.5 shrink-0 text-brand" size={18} />
                  {BUSINESS.address}
                </p>
                <a
                  href={BUSINESS.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                >
                  Open in Google Maps Directions →
                </a>
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-muted">Operating Hours</p>
                <p className="mt-1 font-semibold text-gray-800 flex items-center gap-2">
                  <Clock size={16} className="text-brand shrink-0" />
                  {BUSINESS.hours}
                </p>
                <p className="text-xs text-muted mt-0.5 ml-6">Sunday by appointment</p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-muted">Direct Telephone</p>
                <div className="mt-2 grid sm:grid-cols-2 gap-2">
                  {BUSINESS.phones.map((p) => (
                    <a
                      key={p.href}
                      href={p.href}
                      className="flex items-center gap-2 rounded-xl bg-white border border-gray-200 px-4 py-3 font-bold text-gray-900 transition hover:border-brand hover:text-brand"
                    >
                      <Phone size={16} className="text-brand shrink-0" />
                      <span>{p.display}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-muted">Instant Messaging</p>
                <a
                  href={BUSINESS.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 flex items-center justify-between rounded-xl bg-[#25D366] text-white p-3.5 font-bold shadow-sm hover:bg-[#20ba59] transition"
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle size={18} /> Chat with us on WhatsApp
                  </span>
                  <span className="text-xs font-normal bg-black/15 px-2 py-0.5 rounded-full">
                    Instant Response
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
            <h3 className="font-display text-xl font-bold uppercase text-ink flex items-center gap-2">
              <HelpCircle size={20} className="text-brand" /> Dealership FAQs
            </h3>
            <div className="mt-4 divide-y divide-gray-100">
              {FAQS.map((faq, idx) => (
                <div key={faq.q} className="py-3">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                    className="flex w-full items-center justify-between text-left font-bold text-sm text-gray-800 hover:text-brand transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={16}
                      className={`shrink-0 transition-transform duration-200 text-gray-400 ${
                        openFaq === idx ? 'rotate-180 text-brand' : ''
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed animate-in fade-in duration-150">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Customer Inquiry Form */}
        <div>
          <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="font-display text-2xl font-bold uppercase text-ink">
              Send an Online Inquiry
            </h2>
            <p className="mt-1 text-xs text-muted mb-6">
              Our Chunnakam showroom staff will contact you directly via phone or WhatsApp.
            </p>
            <InquiryForm defaultMessage="Hello TS Sales Mart, I would like to inquire about your available cars and vans." />
          </div>
        </div>
      </div>
    </div>
  )
}
