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
  ArrowUpRight,
  CheckCircle2,
  Award,
  Star,
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
      {/* ========================================================= */}
      {/* 1. CINEMATIC LUXURY HERO (Premium Automotive Atmosphere) */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-[#09090b] text-white pt-16 pb-20 sm:pt-20 sm:pb-24 border-b border-white/5">
        {/* Full-bleed Showroom Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src={ASSETS.heroBg || ASSETS.heroLuxury}
            alt="TS SALES MART Showroom Atmosphere"
            className="w-full h-full object-cover object-[75%_center] opacity-35 select-none pointer-events-none"
            loading="eager"
          />
          {/* Ambient Brand Red Glow */}
          <div
            className="absolute -top-32 right-10 w-[550px] h-[550px] rounded-full bg-brand/20 blur-[150px] pointer-events-none"
            aria-hidden="true"
          />
          {/* Deep Dark Gradient Vignette for Razor-sharp Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/90 to-[#09090b]/70 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#09090b] to-transparent pointer-events-none" />
        </div>

        {/* Content Container */}
        <div className="container-page relative z-10">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Red Dash Eyebrow from reference */}
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-[3px] bg-brand inline-block rounded-full" />
                <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-gray-300">
                  ESTABLISHED AUTOMOBILE DEALERSHIP · CHUNNAKAM
                </span>
              </div>

              {/* Bold Headline */}
              <div className="space-y-1">
                <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[0.94]">
                  ABOUT TS SALES MART <br />
                  <span className="text-brand">DRIVE YOUR DREAMS</span>
                </h1>
                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-300">
                  <span className="rounded-md bg-white/10 px-2.5 py-1 font-semibold text-brand backdrop-blur-md border border-white/10">
                    உங்களின் கனவு வாகனங்களுக்கு
                  </span>
                  <span className="text-gray-500">·</span>
                  <span className="flex items-center gap-1.5 text-gray-300">
                    <MapPin size={14} className="text-brand shrink-0" />
                    <span>No. 57, Ampalavanar Road, Uduvil, Chunnakam</span>
                  </span>
                </div>
              </div>

              {/* Supporting Lead Description */}
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal max-w-xl">
                TS SALES MART is a trusted automotive showroom dedicated to connecting drivers, families, and businesses across Sri Lanka with inspected, reliable cars and vans.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/vehicles"
                  className="btn-primary !px-8 !py-4 text-xs font-bold uppercase tracking-wider rounded-xl shadow-xl shadow-red-950/50 flex items-center gap-2"
                >
                  <span>Explore Our Inventory</span>
                  <ArrowUpRight size={17} />
                </Link>
                <Link
                  to="/contact"
                  className="btn-outline !px-8 !py-4 text-xs font-bold uppercase tracking-wider rounded-xl bg-black/40 backdrop-blur-md border-white/20 hover:border-white/40"
                >
                  <span>Contact Dealership</span>
                </Link>
              </div>
            </div>

            {/* Right Dealership Credentials Glass Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-white/10 bg-[#121316]/85 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-black/90">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Physical Showroom
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">Chunnakam, Sri Lanka</span>
                </div>

                {/* 4 Trust Metrics */}
                <div className="grid grid-cols-2 gap-3.5 pt-6">
                  <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition hover:border-brand/40">
                    <div className="text-3xl font-display font-black text-brand">10+</div>
                    <p className="text-xs font-bold uppercase tracking-wider text-white mt-1">Years of Trust</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Automotive Excellence in Jaffna</p>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition hover:border-brand/40">
                    <div className="text-3xl font-display font-black text-white">100%</div>
                    <p className="text-xs font-bold uppercase tracking-wider text-white mt-1">Verified Fleet</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Odometer &amp; Document Certified</p>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition hover:border-brand/40">
                    <div className="text-3xl font-display font-black text-white">500+</div>
                    <p className="text-xs font-bold uppercase tracking-wider text-white mt-1">Vehicles Sold</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Satisfied Drivers Islandwide</p>
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition hover:border-brand/40">
                    <div className="text-3xl font-display font-black text-brand">4.9★</div>
                    <p className="text-xs font-bold uppercase tracking-wider text-white mt-1">Dealership Rating</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Community Trusted Reputation</p>
                  </div>
                </div>

                {/* Quick Concierge Links */}
                <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={BUSINESS.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white py-2.5 px-3 text-xs font-bold text-center flex items-center justify-center gap-2 transition"
                  >
                    <MessageSquare size={15} />
                    <span>WhatsApp Chat</span>
                  </a>
                  <a
                    href={BUSINESS.phones[0].href}
                    className="flex-1 rounded-xl bg-white/10 hover:bg-white/20 text-white py-2.5 px-3 text-xs font-bold text-center flex items-center justify-center gap-2 border border-white/10 transition"
                  >
                    <Phone size={14} className="text-brand" />
                    <span>Call Showroom</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <div className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-5 h-[2px] bg-brand inline-block rounded-full" />
              <span className="eyebrow !text-brand">Dealership Profile</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-neutral-900 leading-tight">
              A Trusted Partner for Everyday &amp; Commercial Vehicles
            </h2>
            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
              Whether you are looking for brand new unregistered Japanese vehicles or verified pre-owned automobiles, our team curates popular models such as the <strong>Toyota Raize</strong>, <strong>Suzuki Wagon R Custom Z</strong>, <strong>Toyota Hilux Rocco</strong>, and versatile passenger &amp; cargo vans including the <strong>Toyota HiAce</strong> and <strong>Toyota Roomy</strong>.
            </p>

            {/* Checklist Highlights */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-neutral-800">
                <CheckCircle2 size={16} className="text-brand shrink-0" />
                <span>Unregistered Japanese Imports</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-neutral-800">
                <CheckCircle2 size={16} className="text-brand shrink-0" />
                <span>Certified Pre-Owned Cars &amp; Vans</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-neutral-800">
                <CheckCircle2 size={16} className="text-brand shrink-0" />
                <span>Odometer &amp; Document Guarantee</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-neutral-800">
                <CheckCircle2 size={16} className="text-brand shrink-0" />
                <span>Honest Trade-In &amp; Exchange Value</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link to="/vehicles" className="btn-primary">
                Explore Our Inventory <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-outline-dark">
                Contact Dealership
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-900 shadow-2xl group">
              <img
                src={ASSETS.heroLuxury || ASSETS.hero}
                alt="TS SALES MART Showroom Vehicles"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="inline-block rounded-md bg-brand px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white">
                  Chunnakam Showroom
                </span>
                <p className="text-sm font-bold text-gray-100">{BUSINESS.address}</p>
                <p className="text-xs text-gray-400">Visit us to inspect genuine vehicles in person</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars of Excellence */}
        <div className="mt-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 justify-center mb-2">
              <span className="w-5 h-[2px] bg-brand inline-block rounded-full" />
              <span className="eyebrow !text-brand">The TS Difference</span>
              <span className="w-5 h-[2px] bg-brand inline-block rounded-full" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase mt-1">Our Dealership Commitments</h2>
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

            <div className="lg:col-span-5 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md space-y-4">
              <h3 className="font-display text-xl font-bold uppercase text-white">Chunnakam Showroom</h3>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Visit our physical dealership on Ampalavanar Road to view vehicles in person, test options, and arrange immediate registration or trade-in exchange.
              </p>
              <div className="pt-2 flex flex-col gap-2.5">
                <a
                  href={BUSINESS.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline !py-2.5 !px-4 text-xs font-semibold justify-center"
                >
                  <Compass size={14} /> Open Location in Google Maps
                </a>
                <a
                  href={BUSINESS.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn !py-2.5 !px-4 text-xs font-bold justify-center bg-[#25D366] text-white hover:bg-[#20ba59] transition"
                >
                  <MessageSquare size={14} /> Direct WhatsApp Message
                </a>
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
      <section className="relative overflow-hidden bg-[#09090b] text-white pt-16 pb-20 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img
            src={ASSETS.heroBg || ASSETS.heroLuxury}
            alt="TS SALES MART Showroom"
            className="w-full h-full object-cover object-[80%_center] opacity-30 select-none pointer-events-none"
            loading="eager"
          />
          <div
            className="absolute -top-32 right-0 w-96 h-96 rounded-full bg-brand/20 blur-[130px] pointer-events-none"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/90 to-[#09090b]/75 pointer-events-none" />
        </div>
        <div className="container-page relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-[3px] bg-brand inline-block rounded-full" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-gray-300">
              CONCIERGE &amp; SHOWROOM INQUIRIES · CHUNNAKAM
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none">
            Contact TS SALES MART
          </h1>
          <p className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed">
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
