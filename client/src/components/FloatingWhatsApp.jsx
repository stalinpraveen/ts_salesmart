import { useState } from 'react'
import { MessageCircle, Phone, MapPin, X, Clock, ChevronDown } from 'lucide-react'
import { BUSINESS, ASSETS } from '../utils/constants'
import { getShowroomStatus } from '../utils/showroomStatus'

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false)
  const status = getShowroomStatus()

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Quick Contact Card */}
      {open && (
        <div className="mb-3 w-80 sm:w-96 overflow-hidden rounded-3xl border border-gray-200 bg-white/95 backdrop-blur-xl shadow-2xl animate-in slide-in-from-bottom-5 duration-200 text-ink">
          {/* Header */}
          <div className="bg-[#111114] p-4 text-white relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3.5 top-3.5 rounded-full p-1.5 text-gray-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              aria-label="Close contact popup"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white p-1 shrink-0">
                <img
                  src={ASSETS.logo}
                  alt="TS SALES MART"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <p className="font-display text-sm font-bold uppercase tracking-wider text-white">
                  TS SALES MART
                </p>
                <p className="text-[11px] text-gray-300">Drive Your Dreams · Chunnakam</p>
              </div>
            </div>

            {/* Showroom Live Status Badge */}
            <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-white/10">
              <span className="flex items-center gap-1.5 font-medium text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                {status.badgeText}
              </span>
              <span className="text-[11px] text-gray-400">{status.detail}</span>
            </div>
          </div>

          {/* Quick Actions List */}
          <div className="p-4 space-y-2.5 text-xs sm:text-sm">
            <p className="text-xs text-gray-600 font-medium">
              Connect directly with our vehicle sales specialists in Sri Lanka:
            </p>

            {/* WhatsApp Direct Chat */}
            <a
              href={BUSINESS.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-2xl bg-[#25D366] text-white p-3.5 font-bold shadow-md hover:bg-[#20ba59] transition hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-2.5">
                <MessageCircle size={20} />
                <span>Chat on WhatsApp</span>
              </div>
              <span className="text-[11px] bg-black/15 px-2 py-0.5 rounded-full">Instant</span>
            </a>

            {/* Direct Phone Calls */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {BUSINESS.phones.map((p) => (
                <a
                  key={p.href}
                  href={p.href}
                  className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-surface p-2.5 text-center font-bold text-gray-800 hover:border-brand hover:text-brand hover:bg-red-50/20 transition"
                >
                  <span className="flex items-center gap-1 text-[11px] text-muted font-normal">
                    <Phone size={12} className="text-brand" /> Direct Call
                  </span>
                  <span className="text-xs mt-0.5">{p.display}</span>
                </a>
              ))}
            </div>

            {/* Location & Directions */}
            <a
              href={BUSINESS.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl border border-gray-200 p-2.5 text-xs text-gray-700 hover:border-gray-400 transition"
            >
              <MapPin size={16} className="text-brand shrink-0" />
              <div className="truncate">
                <span className="font-semibold block truncate">Uduvil, Chunnakam</span>
                <span className="text-[11px] text-gray-500">Tap for Google Maps</span>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Contact TS Sales Mart on WhatsApp"
        className="group relative flex items-center gap-2.5 rounded-full bg-[#25D366] text-white px-4 py-3 sm:px-5 sm:py-3.5 shadow-2xl shadow-green-900/40 hover:bg-[#20ba59] hover:scale-105 transition-all duration-300 cursor-pointer"
      >
        <div className="relative">
          <MessageCircle size={24} className="transition-transform group-hover:scale-110" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
          </span>
        </div>
        <span className="text-xs sm:text-sm font-bold tracking-wide">
          {open ? 'Close' : 'Chat with Us'}
        </span>
        {open && <ChevronDown size={16} />}
      </button>
    </div>
  )
}
