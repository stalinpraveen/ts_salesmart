import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, Heart, User, Menu, X, Phone, Shield, Calendar } from 'lucide-react'
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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09090b]/95 backdrop-blur-xl transition-all duration-200">
      <div className="container-page flex h-20 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" aria-label="TS SALES MART Home" className="group flex items-center gap-3 shrink-0 py-1">
          <div className="rounded-xl bg-white p-1.5 shadow-sm transition-transform duration-300 group-hover:scale-105">
            <img
              src={ASSETS.logo}
              alt="TS SALES MART — Drive Your Dreams"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </div>
          <div className="hidden sm:block text-left">
            <span className="font-display text-lg font-black tracking-wider uppercase text-white block leading-none">
              TS SALES MART
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-brand">
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
                `relative py-2 text-sm font-semibold tracking-wide transition-colors ${
                  isActive
                    ? 'text-brand font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-brand after:rounded-full'
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
        <div className="flex items-center gap-3">
          {/* Phone Hotline Link from Screenshot */}
          <a
            href={BUSINESS.phones[0].href}
            className="hidden xl:flex items-center gap-1.5 text-xs font-bold text-gray-200 hover:text-brand transition tracking-wide mr-2"
          >
            <Phone size={14} className="text-brand shrink-0" />
            <span>(077) 205-6400</span>
          </a>

          {/* Search Toggle */}
          {searching ? (
            <form onSubmit={submit} className="flex items-center gap-1 bg-white/10 rounded-xl border border-white/20 p-0.5">
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search stock..."
                aria-label="Search vehicles"
                className="w-32 sm:w-48 px-3 py-1.5 text-xs text-white placeholder:text-gray-400 bg-transparent focus:outline-none"
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
              className="grid h-10 w-10 place-items-center rounded-xl text-gray-300 transition hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <Search size={18} />
            </button>
          )}

          {/* Favourites with badge */}
          <Link
            to="/favorites"
            aria-label={`Favourites (${count})`}
            className="relative grid h-10 w-10 place-items-center rounded-xl text-gray-300 transition hover:bg-white/10 hover:text-brand"
          >
            <Heart size={19} className={count > 0 ? 'fill-brand text-brand' : ''} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-brand text-[10px] font-black text-white shadow-sm ring-2 ring-[#09090b]">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </Link>

          {/* Profile link */}
          <Link
            to="/login"
            aria-label={user ? `${user.name} - Profile` : 'Sign in to account'}
            className="grid h-10 w-10 place-items-center rounded-xl text-gray-300 transition hover:bg-white/10 hover:text-white"
          >
            <User size={18} className={user ? 'text-brand' : ''} />
          </Link>

          {/* Red Action Button: Matching "Book a Test Drive" from screenshot */}
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-950/40 hover:bg-red-600 active:scale-95 transition"
          >
            <Calendar size={14} />
            <span>Book a Test Drive</span>
          </Link>

          {/* Mobile Menu Hamburger */}
          <button
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-xl text-gray-300 transition hover:bg-white/10 hover:text-white lg:hidden cursor-pointer"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <nav aria-label="Mobile Navigation" className="border-t border-white/10 bg-[#09090b] px-4 py-5 lg:hidden animate-in fade-in duration-200">
          <div className="flex flex-col space-y-2">
            {NAV_ITEMS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-gray-200 hover:bg-white/10 hover:text-brand transition"
              >
                <span>{l.label}</span>
                <span className="text-xs text-gray-500">›</span>
              </Link>
            ))}

            <Link
              to="/favorites"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-gray-200 hover:bg-white/10 hover:text-brand transition"
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
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-brand bg-red-950/20 hover:bg-red-950/40 transition"
              >
                <Shield size={16} /> Staff Dashboard
              </Link>
            )}

            <div className="pt-3 border-t border-white/10">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="btn-primary w-full text-center flex items-center justify-center gap-2"
              >
                <Calendar size={15} /> Book a Test Drive
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
