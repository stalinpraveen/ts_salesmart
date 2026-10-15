import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, Heart, User, Menu, X, Phone, Shield, MapPin, Clock } from 'lucide-react'
import { ASSETS, BUSINESS, NAV_LINKS } from '../utils/constants'
import { useFavorites } from '../features/favorites/FavoritesContext'
import { useAuth } from '../features/auth/AuthContext'

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
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/90 backdrop-blur-md shadow-sm transition-all duration-200">
      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#09090b] text-[11px] text-gray-300 border-b border-white/5 py-1.5">
        <div className="container-page flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="hidden md:flex items-center gap-1.5 text-gray-400">
              <MapPin size={12} className="text-brand shrink-0" />
              <span>{BUSINESS.address}</span>
            </span>
            <span className="hidden lg:flex items-center gap-1.5 text-gray-400 border-l border-white/10 pl-4">
              <Clock size={12} className="text-brand shrink-0" />
              <span>Mon - Sat: 8:30 AM - 6:00 PM</span>
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-gray-400 hidden sm:inline">Call Hotline:</span>
            </div>
            {BUSINESS.phones.map((p) => (
              <a
                key={p.href}
                href={p.href}
                className="flex items-center gap-1 font-bold text-white hover:text-brand transition tracking-wide"
              >
                <Phone size={11} className="text-brand shrink-0" />
                {p.display}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link to="/" aria-label="TS SALES MART home" className="group flex items-center gap-3 shrink-0 py-1">
          <img
            src={ASSETS.logo}
            alt="TS SALES MART — Drive Your Dreams"
            className="h-14 sm:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `relative rounded-xl px-3.5 py-2 text-sm font-semibold tracking-wide transition-all duration-200 hover:text-brand ${
                  isActive ? 'text-brand font-bold bg-neutral-100/70' : 'text-neutral-700 hover:bg-neutral-50'
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
                `flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-bold transition-all duration-200 border border-brand/30 bg-red-50 text-brand hover:bg-brand hover:text-white ${
                  isActive ? 'bg-brand text-white shadow-sm' : ''
                }`
              }
            >
              <Shield size={14} /> Staff Dashboard
            </NavLink>
          )}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2">
          {searching ? (
            <form onSubmit={submit} className="flex items-center gap-1 bg-white rounded-xl shadow-md border border-neutral-300 p-0.5">
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search brand, model..."
                aria-label="Search vehicles"
                className="w-36 sm:w-56 px-3 py-1.5 text-xs text-ink focus:outline-none"
              />
              <button
                type="button"
                aria-label="Close search"
                onClick={() => setSearching(false)}
                className="p-1.5 text-neutral-400 hover:text-ink cursor-pointer"
              >
                <X size={16} />
              </button>
            </form>
          ) : (
            <button
              aria-label="Search vehicles"
              onClick={() => setSearching(true)}
              className="grid h-10 w-10 place-items-center rounded-xl text-neutral-700 transition hover:bg-neutral-100 hover:text-brand cursor-pointer"
            >
              <Search size={19} />
            </button>
          )}

          <Link
            to="/favorites"
            aria-label={`Favourites (${count})`}
            className="relative grid h-10 w-10 place-items-center rounded-xl text-neutral-700 transition hover:bg-neutral-100 hover:text-brand"
          >
            <Heart size={20} className={count > 0 ? 'fill-brand text-brand' : ''} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-brand text-[10px] font-black text-white shadow-sm ring-2 ring-white">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </Link>

          <Link
            to="/login"
            aria-label={user ? `${user.name} - Profile` : 'Sign in to account'}
            className="flex items-center gap-2 rounded-xl px-2.5 py-1.5 transition text-neutral-700 hover:bg-neutral-100 hover:text-brand"
          >
            <div className="grid h-8 w-8 place-items-center rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200">
              <User size={16} className={user ? 'text-brand' : ''} />
            </div>
            {user && (
              <span className="hidden xl:inline-block max-w-[85px] truncate text-xs font-bold">
                {user.name.split(' ')[0]}
              </span>
            )}
          </Link>

          <Link to="/contact" className="btn-primary ml-1 hidden !py-2.5 !px-4 md:inline-flex text-xs">
            Sell or Enquire
          </Link>

          <button
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-xl text-neutral-800 transition hover:bg-neutral-100 lg:hidden cursor-pointer"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {open && (
        <nav aria-label="Mobile Navigation" className="border-t border-neutral-200 bg-white/98 backdrop-blur-xl lg:hidden animate-in fade-in duration-200">
          <div className="container-page flex flex-col py-4 space-y-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-100 hover:text-brand transition"
              >
                <span>{l.label}</span>
                <span className="text-xs text-neutral-400">›</span>
              </Link>
            ))}
            <Link
              to="/favorites"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-100 hover:text-brand transition"
            >
              <span className="flex items-center gap-2">
                <Heart size={16} className={count > 0 ? 'fill-brand text-brand' : ''} />
                Saved Favourites
              </span>
              {count > 0 && <span className="badge bg-brand text-white">{count}</span>}
            </Link>
            {isStaff && (
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-brand bg-red-50 hover:bg-red-100 transition"
              >
                <Shield size={16} /> Staff Dashboard
              </Link>
            )}
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-100 transition"
            >
              <span>{user ? `Account (${user.name})` : 'Sign In / Register'}</span>
              <span className="text-xs text-neutral-400">›</span>
            </Link>
            <div className="pt-2">
              <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary w-full text-center">
                Sell or Enquire
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
