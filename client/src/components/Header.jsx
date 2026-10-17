import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, Heart, User, Menu, X, Phone, Shield, MessageSquare, Car, Bus, Mountain, MapPin } from 'lucide-react'
import { ASSETS, BUSINESS } from '../utils/constants'
import { useFavorites } from '../features/favorites/FavoritesContext'
import { useAuth } from '../features/auth/AuthContext'

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/vehicles', label: 'Inventory' },
  { to: '/vehicles?type=car', label: 'Cars' },
  { to: '/vehicles?type=van', label: 'Vans' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [searching, setSearching] = useState(false)
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const { count } = useFavorites()
  const { user, isStaff } = useAuth()

  const submit = (e) => {
    e.preventDefault()
    if (q.trim()) navigate(`/vehicles?q=${encodeURIComponent(q.trim())}`)
    setSearching(false)
    setOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09090b]/95 backdrop-blur-xl transition-all duration-300 shadow-lg shadow-black/20">
        <div className="container-page flex h-20 items-center justify-between gap-3 sm:gap-4">
          {/* Logo */}
          <Link to="/" aria-label="TS SALES MART Home" className="group flex items-center gap-2.5 sm:gap-3 shrink-0 py-1">
            <div className="rounded-xl bg-white p-1.5 shadow-sm transition-transform duration-300 group-hover:scale-105 ring-1 ring-white/20">
              <img
                src={ASSETS.logo}
                alt="TS SALES MART — Drive Your Dreams"
                className="h-9 sm:h-11 md:h-12 w-auto object-contain"
              />
            </div>
            <div className="text-left">
              <span className="font-display text-base sm:text-lg font-black tracking-wider uppercase text-white block leading-none">
                TS SALES MART
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-brand">
                Drive Your Dreams
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Matching Reference Active Red Underline) */}
          <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
            {NAV_ITEMS.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `relative py-2 text-sm font-semibold tracking-wide transition-colors duration-200 ${
                    isActive
                      ? 'text-brand font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-brand after:rounded-full after:shadow-sm after:shadow-red-500'
                      : 'text-gray-300 hover:text-white'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            {isStaff && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all border border-brand/40 bg-brand/10 text-brand hover:bg-brand hover:text-white ${
                    isActive ? 'bg-brand text-white shadow-sm' : ''
                  }`
                }
              >
                <Shield size={13} /> Staff
              </NavLink>
            )}
          </nav>

          {/* Right Action Icons & Book a Test Drive CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Phone Hotline Link from Reference */}
            <a
              href={BUSINESS.phones[0].href}
              className="hidden xl:flex items-center gap-1.5 text-xs font-bold text-gray-200 hover:text-brand transition tracking-wide mr-2 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-xl border border-white/10"
            >
              <Phone size={13} className="text-brand shrink-0 animate-pulse" />
              <span>(077) 205-6400</span>
            </a>

            {/* Search Toggle */}
            {searching ? (
              <form onSubmit={submit} className="flex items-center gap-1 bg-white/10 rounded-xl border border-white/20 p-0.5 animate-in fade-in zoom-in-95 duration-150">
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search stock..."
                  aria-label="Search vehicles"
                  className="w-28 sm:w-48 px-3 py-1.5 text-xs text-white placeholder:text-gray-400 bg-transparent focus:outline-none"
                />
                <button
                  type="button"
                  aria-label="Close search"
                  onClick={() => setSearching(false)}
                  className="p-1.5 text-gray-400 hover:text-white cursor-pointer"
                >
                  <X size={15} />
                </button>
              </form>
            ) : (
              <button
                aria-label="Search vehicles"
                onClick={() => setSearching(true)}
                className="grid h-10 w-10 place-items-center rounded-xl text-gray-300 transition hover:bg-white/10 hover:text-white cursor-pointer active:scale-95"
              >
                <Search size={18} />
              </button>
            )}

            {/* Favourites with badge */}
            <Link
              to="/favorites"
              aria-label={`Favourites (${count})`}
              className="relative grid h-10 w-10 place-items-center rounded-xl text-gray-300 transition hover:bg-white/10 hover:text-brand active:scale-95"
            >
              <Heart size={19} className={count > 0 ? 'fill-brand text-brand' : ''} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-brand text-[10px] font-black text-white shadow-sm ring-2 ring-[#09090b] animate-heart-pop">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </Link>

            {/* Profile link */}
            <Link
              to="/login"
              aria-label={user ? `${user.name} - Profile` : 'Sign in to account'}
              className="grid h-10 w-10 place-items-center rounded-xl text-gray-300 transition hover:bg-white/10 hover:text-white active:scale-95"
            >
              <User size={18} className={user ? 'text-brand' : ''} />
            </Link>

            {/* Red Action Button: Explore Vehicles */}
            <Link
              to="/vehicles"
              className="hidden md:inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-950/40 hover:bg-red-600 active:scale-95 transition"
            >
              <span>Explore Vehicles</span>
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="grid h-10 w-10 place-items-center rounded-xl text-gray-300 transition hover:bg-white/10 hover:text-white lg:hidden cursor-pointer active:scale-90"
            >
              {open ? <X size={22} className="text-brand" /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop & Menu */}
      {open && (
        <div className="fixed inset-0 top-20 z-40 bg-black/80 backdrop-blur-md lg:hidden animate-in fade-in duration-200">
          <nav
            aria-label="Mobile Navigation"
            className="border-b border-white/10 bg-[#09090b]/98 px-5 py-6 max-h-[calc(100vh-5rem)] overflow-y-auto animate-in slide-in-from-top-4 duration-300"
          >
            {/* Quick Category Buttons on Mobile */}
            <div className="grid grid-cols-3 gap-2 pb-5 border-b border-white/10">
              <Link
                to="/vehicles?type=car"
                onClick={() => setOpen(false)}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-brand/40 text-center transition active:scale-95"
              >
                <Car size={20} className="text-brand mb-1" />
                <span className="text-xs font-bold text-white">Cars</span>
              </Link>
              <Link
                to="/vehicles?type=van"
                onClick={() => setOpen(false)}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-brand/40 text-center transition active:scale-95"
              >
                <Bus size={20} className="text-brand mb-1" />
                <span className="text-xs font-bold text-white">Vans</span>
              </Link>
              <Link
                to="/vehicles?type=suv"
                onClick={() => setOpen(false)}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-brand/40 text-center transition active:scale-95"
              >
                <Mountain size={20} className="text-brand mb-1" />
                <span className="text-xs font-bold text-white">SUVs</span>
              </Link>
            </div>

            {/* Main Links */}
            <div className="flex flex-col space-y-1 py-4 border-b border-white/10">
              {NAV_ITEMS.map((l) => (
                <NavLink
                  key={l.label}
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? 'bg-brand/10 text-brand font-bold border border-brand/20'
                        : 'text-gray-200 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  <span>{l.label}</span>
                  <span className="text-xs text-gray-500">›</span>
                </NavLink>
              ))}

              <NavLink
                to="/favorites"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-brand/10 text-brand font-bold border border-brand/20'
                      : 'text-gray-200 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <span className="flex items-center gap-2">
                  <Heart size={16} className={count > 0 ? 'fill-brand text-brand' : ''} />
                  Saved Favourites
                </span>
                {count > 0 && <span className="badge bg-brand text-white">{count}</span>}
              </NavLink>

              {isStaff && (
                <NavLink
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-brand bg-red-950/30 border border-brand/30 hover:bg-red-950/50 transition"
                >
                  <Shield size={16} /> Staff Dashboard
                </NavLink>
              )}
            </div>

            {/* Direct Hotline & WhatsApp in Drawer */}
            <div className="pt-4 space-y-2.5">
              <a
                href={BUSINESS.phones[0].href}
                className="btn-primary w-full !py-3 text-xs font-bold justify-center"
              >
                <Phone size={15} /> Call Showroom: {BUSINESS.phones[0].display}
              </a>

              <a
                href={BUSINESS.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="btn w-full !py-3 text-xs font-bold justify-center bg-[#25D366] text-white hover:bg-[#20ba59] transition"
              >
                <MessageSquare size={15} /> Chat on WhatsApp
              </a>

              <p className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 pt-2 text-center">
                <MapPin size={12} className="text-brand shrink-0" />
                <span>Uduvil, Chunnakam, Sri Lanka</span>
              </p>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}

