import { Link } from 'react-router-dom'
import {
  Phone,
  MapPin,
  ShieldCheck,
  Car,
  Handshake,
  Users,
  Clock,
  MessageSquare,
  Compass,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { BUSINESS, ASSETS } from '../utils/constants'
import InquiryForm from '../features/inquiries/InquiryForm'
import { usePageTitle } from '../hooks/usePageTitle'

export function PagePlaceholder({ title, children }) {
  usePageTitle(`${title} | TS SALES MART`)
  return (
    <div className="container-page py-24 text-center max-w-md mx-auto">
      <h1 className="font-display text-3xl font-extrabold uppercase">{title}</h1>
      <p className="mt-4 text-sm text-neutral-500 leading-relaxed">
        {children || 'This page is currently being updated with the latest dealership information.'}
      </p>
      <Link to="/" className="btn-primary mt-6 inline-flex">
        Back to Showroom Home
      </Link>
    </div>
  )
}

export const NotFound = () => (
  <PagePlaceholder title="Page Not Found">
    The page you are looking for does not exist or has been relocated.
  </PagePlaceholder>
)

export function About() {
  usePageTitle('About Us | TS SALES MART — Drive Your Dreams')

  const PILLARS = [
    {
      icon: Car,
      title: 'Curated Japanese Imports',
      desc: 'Selective procurement of popular vehicles from Toyota, Suzuki, Honda, and Nissan tailored to Sri Lankan roads.',
    },
    {
      icon: ShieldCheck,
      title: 'Inspected Quality & Clear Title',
      desc: 'Transparent verification of odometer readings, vehicle manufacturing year, and complete ownership papers.',
    },
    {
      icon: Handshake,
      title: 'Buy, Sell & Exchange',
      desc: 'Honest appraisal for your current car or van with seamless trade-in arrangements at our Chunnakam showroom.',
    },
    {
      icon: Users,
      title: 'Dedicated Customer Care',
      desc: 'Personalized guidance from our experienced sales team from initial inspection to final handover.',
    },
  ]

  return (
    <div className="min-h-screen bg-[#fcfcfd]">
      {/* Dark Luxury Hero */}
      <section className="relative overflow-hidden bg-[#09090b] text-white pt-14 pb-20 border-b border-neutral-800">
        <div
          className="absolute -top-32 right-0 w-96 h-96 rounded-full bg-brand/15 blur-[120px] pointer-events-none"
          aria-hidden="true"
        />
        <div className="container-page relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-semibold text-gray-300 backdrop-blur-md">
            <Sparkles size={13} className="text-brand" />
            <span>ESTABLISHED AUTOMOBILE DEALERSHIP · CHUNNAKAM</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white mt-4 leading-none">
            About TS SALES MART <br />
            <span className="text-brand">Drive Your Dreams</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base font-semibold text-gray-400">
            உங்களின் கனவு வாகனங்களுக்கு · No. 57, Ampalavanar Road, Uduvil, Chunnakam
          </p>
          <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed font-normal max-w-2xl">
            TS SALES MART is a trusted automotive showroom dedicated to connecting drivers, families, and businesses across Sri Lanka with inspected, reliable cars and vans.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <div className="container-page py-16">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="eyebrow">Dealership Profile</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-neutral-900 leading-tight">
              A Trusted Partner for Everyday &amp; Commercial Vehicles
            </h2>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
              Situated in the automotive hub of Uduvil along Ampalavanar Road in Chunnakam, <strong>TS SALES MART</strong> has grown to become a benchmark for transparent vehicle sales in the Northern Province and across the island.
            </p>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
              Whether you are looking for brand new unregistered Japanese vehicles or verified pre-owned automobiles, our team curates popular models such as the <strong>Toyota Raize</strong>, <strong>Suzuki Wagon R Custom Z</strong>, <strong>Toyota Hilux Rocco</strong>, and versatile passenger &amp; cargo vans including the <strong>Toyota HiAce</strong> and <strong>Toyota Roomy</strong>.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link to="/vehicles" className="btn-primary">
                Explore Our Inventory <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-outline-dark">
                Contact Dealership
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-900 shadow-2xl">
              <img
                src={ASSETS.hero}
                alt="TS SALES MART Showroom Vehicles"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs font-bold uppercase tracking-widest text-brand">Chunnakam Showroom</p>
                <p className="text-sm font-bold text-gray-200 mt-0.5">{BUSINESS.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars of Excellence */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="eyebrow justify-center">The TS Difference</p>
            <h2 className="font-display text-3xl font-extrabold uppercase mt-1">Our Dealership Commitments</h2>
            <p className="mt-2 text-sm text-neutral-500">
              Every car or van that enters our showroom undergoes verified checks to ensure complete peace of mind.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm transition hover:shadow-xl hover:border-neutral-300 hover:-translate-y-1"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-red-50 text-brand">
                  <Icon size={24} />
                </div>
                <h3 className="mt-5 text-base font-bold text-neutral-900">{title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-neutral-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Official Showcase Banner */}
        <div className="mt-20 rounded-3xl border border-neutral-800 bg-[#09090b] text-white p-8 sm:p-14 shadow-2xl">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="badge bg-brand text-white font-bold tracking-widest uppercase text-xs">
                Official Business Showcase · உங்களின் கனவு வாகனங்களுக்கு
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase leading-tight">
                Special Offers &amp; Genuine Automobiles
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Visit our physical showroom in Uduvil to test features, verify documents, and negotiate your next car or van purchase in person.
              </p>
              <div className="space-y-2 pt-2 text-sm text-gray-300">
                <p className="flex items-center gap-2">
                  <MapPin size={16} className="text-brand shrink-0" /> {BUSINESS.address}
                </p>
                <p className="flex items-center gap-2">
                  <Clock size={16} className="text-brand shrink-0" /> {BUSINESS.hours} (Sunday by appointment)
                </p>
              </div>
              <div className="pt-4 flex flex-wrap gap-3">
                {BUSINESS.phones.map((p) => (
                  <a key={p.href} href={p.href} className="btn-primary !py-2.5 text-xs font-bold">
                    <Phone size={14} /> Call Hotline: {p.display}
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-2xl border border-white/20 shadow-xl bg-neutral-900">
                <img
                  src={ASSETS.poster1}
                  alt="TS SALES MART Promotional Poster 1"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/20 shadow-xl bg-neutral-900">
                <img
                  src={ASSETS.poster2}
                  alt="TS SALES MART Promotional Poster 2"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Contact() {
  usePageTitle('Contact Our Dealership | TS SALES MART')

  return (
    <div className="min-h-screen bg-[#fcfcfd]">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-[#09090b] text-white pt-14 pb-20 border-b border-neutral-800">
        <div
          className="absolute -top-32 right-0 w-96 h-96 rounded-full bg-brand/15 blur-[120px] pointer-events-none"
          aria-hidden="true"
        />
        <div className="container-page relative z-10 max-w-3xl">
          <span className="eyebrow !text-gray-300">Get In Touch</span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white mt-2 leading-none">
            Contact TS SALES MART
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-300 font-normal leading-relaxed">
            Have questions about a car or van in our inventory, want to arrange an inspection, or discuss selling/exchanging your vehicle? Connect with us via telephone, WhatsApp, or through the inquiry form below.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <div className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* Left Showroom Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-neutral-200 bg-white p-7 sm:p-9 shadow-xl shadow-black/5">
              <span className="eyebrow">Physical Location</span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase mt-1">
                Chunnakam Showroom
              </h2>

              <div className="mt-6 space-y-6 text-sm">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">Showroom Address</p>
                  <p className="mt-1 flex items-start gap-2.5 font-bold text-neutral-900 leading-snug">
                    <MapPin className="shrink-0 text-brand mt-0.5" size={18} />
                    <span>{BUSINESS.address}</span>
                  </p>
                  <a
                    href={BUSINESS.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline"
                  >
                    <Compass size={14} /> Open Location in Google Maps →
                  </a>
                </div>

                <div className="border-t border-neutral-100 pt-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">Telephone Hotlines</p>
                  <div className="mt-2 space-y-2">
                    {BUSINESS.phones.map((p) => (
                      <a
                        key={p.href}
                        href={p.href}
                        className="flex items-center justify-between rounded-xl bg-neutral-50 border border-neutral-200 px-4 py-3 font-bold text-neutral-900 hover:border-brand hover:text-brand transition"
                      >
                        <span className="flex items-center gap-2">
                          <Phone size={15} className="text-brand" /> {p.display}
                        </span>
                        <span className="text-xs text-neutral-400">Direct Call</span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="border-t border-neutral-100 pt-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">Instant WhatsApp Chat</p>
                  <a
                    href={BUSINESS.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 flex items-center justify-between rounded-xl bg-[#25D366] text-white px-4 py-3 font-bold hover:bg-[#20ba59] transition shadow-xs"
                  >
                    <span className="flex items-center gap-2">
                      <MessageSquare size={16} /> Chat on WhatsApp
                    </span>
                    <span className="text-xs text-white/90">Fast Response</span>
                  </a>
                </div>

                <div className="border-t border-neutral-100 pt-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">Opening Hours</p>
                  <p className="mt-1 flex items-center gap-2 font-bold text-neutral-800">
                    <Clock size={16} className="text-brand shrink-0" />
                    <span>{BUSINESS.hours}</span>
                  </p>
                  <p className="text-xs text-neutral-500 mt-1 pl-6">
                    Sunday visits available by prior telephone appointment.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Inquiry Form Card */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-neutral-200 bg-white p-7 sm:p-9 shadow-xl shadow-black/5">
              <span className="eyebrow">Direct Message</span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase mt-1">
                Send Dealership Inquiry
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-neutral-500 mb-6">
                Fill out the form below with your requirements and our sales executives will get in touch with you promptly.
              </p>
              <InquiryForm defaultMessage="Hello TS SALES MART, I would like to inquire about your available cars and vans." />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
