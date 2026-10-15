import { Link } from 'react-router-dom'
import { Phone, MapPin, ShieldCheck, Car, Handshake, Users } from 'lucide-react'
import { BUSINESS, ASSETS } from '../utils/constants'
import InquiryForm from '../features/inquiries/InquiryForm'
import { usePageTitle } from '../hooks/usePageTitle'

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
  return (
    <div className="container-page py-14">
      <div className="max-w-3xl">
        <p className="eyebrow">Dealership Profile</p>
        <h1 className="section-title mt-1">About TS SALES MART</h1>
        <p className="mt-2 text-lg font-medium text-brand">Drive Your Dreams · உங்கள் கனவு வாகனங்களுக்கு</p>
        <p className="mt-5 text-gray-700 leading-relaxed">
          Welcome to <strong>TS SALES MART</strong>, an established automobile dealership situated in Uduvil, Chunnakam, Sri Lanka. We specialize in providing high-quality new and trusted pre-owned vehicles to customers across the Northern Province and island-wide.
        </p>
        <p className="mt-4 text-gray-700 leading-relaxed">
          From popular compact SUVs like the Toyota Raize and fuel-efficient hatchbacks like the Suzuki Wagon R and Swift, to reliable commercial and passenger vans such as Toyota HiAce and Roomy, we help you find the vehicle that fits your everyday family or commercial needs.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-surface/50 p-6">
          <Car className="text-brand" size={28} />
          <h3 className="mt-3 font-bold text-lg">New &amp; Pre-Owned</h3>
          <p className="mt-2 text-sm text-muted">Wide selection of leading Japanese models including Toyota, Suzuki, Honda, and Nissan.</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-surface/50 p-6">
          <ShieldCheck className="text-brand" size={28} />
          <h3 className="mt-3 font-bold text-lg">Verified Quality</h3>
          <p className="mt-2 text-sm text-muted">Carefully maintained vehicles with transparent mileage, condition, and vehicle details.</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-surface/50 p-6">
          <Handshake className="text-brand" size={28} />
          <h3 className="mt-3 font-bold text-lg">Buy, Sell &amp; Exchange</h3>
          <p className="mt-2 text-sm text-muted">Convenient trade-in options and honest price evaluations for your current car or van.</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-surface/50 p-6">
          <Users className="text-brand" size={28} />
          <h3 className="mt-3 font-bold text-lg">Friendly Guidance</h3>
          <p className="mt-2 text-sm text-muted">Dedicated support to guide you through vehicle selection, options, and paperwork.</p>
        </div>
      </div>

      <div className="mt-16 rounded-3xl bg-ink text-white p-8 sm:p-12">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <span className="badge bg-brand text-white font-semibold">Special Sale &amp; Promotions</span>
            <h2 className="font-display text-3xl font-extrabold uppercase mt-3">
              Visit Our Chunnakam Showroom
            </h2>
            <p className="mt-4 text-gray-300 text-sm leading-relaxed">
              Explore our current vehicle lineup in person or contact us directly. Our showroom is conveniently located along Ampalavanar Road in Uduvil.
            </p>
            <div className="mt-6 space-y-2 text-sm text-gray-300">
              <p className="flex items-center gap-2"><MapPin size={16} className="text-brand shrink-0" /> {BUSINESS.address}</p>
              {BUSINESS.phones.map((p) => (
                <p key={p.href} className="flex items-center gap-2">
                  <Phone size={16} className="text-brand shrink-0" />
                  <a href={p.href} className="hover:text-white font-semibold">{p.display}</a>
                </p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/vehicles" className="btn-primary">Browse Vehicles</Link>
              <Link to="/contact" className="btn-outline">Contact Us</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-2xl border border-white/20 shadow-xl">
              <img src={ASSETS.poster1} alt="TS SALES MART Promotional Poster 1" className="h-full w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/20 shadow-xl">
              <img src={ASSETS.poster2} alt="TS SALES MART Promotional Poster 2" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Contact() {
  usePageTitle('Contact Us | TS SALES MART')
  return (
    <div className="container-page py-14">
      <div className="max-w-2xl">
        <p className="eyebrow">Get In Touch</p>
        <h1 className="section-title mt-1">Contact Our Team</h1>
        <p className="mt-2 text-sm text-muted">
          Have an inquiry about a car, van, or wish to discuss selling or exchanging your vehicle? Reach out to us anytime.
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="rounded-2xl border border-gray-200 bg-surface p-6 sm:p-8">
            <h2 className="font-display text-2xl font-bold uppercase">Showroom Details</h2>
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
                  Open in Google Maps →
                </a>
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-muted">Direct Telephone</p>
                <div className="mt-2 space-y-2">
                  {BUSINESS.phones.map((p) => (
                    <a
                      key={p.href}
                      href={p.href}
                      className="flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-4 py-3 font-bold text-gray-900 transition hover:border-brand hover:text-brand"
                    >
                      <Phone size={16} className="text-brand" />
                      {p.display}
                    </a>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-5 text-xs text-muted">
                <p><strong>Note:</strong> Inspection and test-drive inquiries are welcome during daytime operating hours.</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
            <h2 className="font-display text-2xl font-bold uppercase">Send An Inquiry</h2>
            <p className="mt-1 text-xs text-muted mb-6">
              Fill out the form below and our staff will get in touch with you promptly.
            </p>
            <InquiryForm defaultMessage="Hello, I would like to inquire about your available cars and vans." />
          </div>
        </div>
      </div>
    </div>
  )
}
