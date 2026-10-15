import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, Heart, User, Menu, X, Phone, Shield, MessageCircle, Clock, LogOut } from 'lucide-react'
import { ASSETS, BUSINESS, NAV_LINKS } from '../utils/constants'
import { useFavorites } from '../features/favorites/FavoritesContext'
import { useAuth } from '../features/auth/AuthContext'
import { useToast } from '../context/ToastContext'
import { getShowroomStatus } from '../utils/showroomStatus'
import LiveSearch from './LiveSearch'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [searching, setSearching] = useState(false)
  const navigate = useNavigate()
  const { count } = useFavorites()
  const { user, isStaff, logout } = useAuth()
  const { showToast } = useToast()
  const showroomStatus = getShowroomStatus()

  const handleLogout = async () => {
    await logout()
    showToast({ message: 'You have been logged out.', type: 'info' })
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md shadow-xs">
      {/* Top Announcement & Direct Contacts Bar */}
      <div className="bg-[#0f0f11] text-[11px] sm:text-xs text-gray-300 border-b border-white/5">
        <div className="container-page flex flex-wrap items-center justify-between py-2 gap-2">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="flex items-center gap-1.5 text-gray-400">
              <Clock size={12} className="text-brand shrink-0" />
              <span>{BUSINESS.hours}</span>
            </span>
            <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold bg-white/10 text-gray-200">
              <span className={`h-1.5 w-1.5 rounded-full ${showroomStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              {showroomStatus.badgeText}
            </span>
            <span className="hidden lg:inline-block text-gray-600">|</span>
            <span className="hidden lg:inline-block text-gray-400 truncate max-w-xs">{BUSINESS.address}</span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <a
              href={BUSINESS.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[#25D366] hover:text-[#1ebd56] font-semibold transition"
            >
              <MessageCircle size={13} />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <div className="flex items-center gap-3">
              {BUSINESS.phones.map((p) => (
                <a
                  key={p.href}
                  href={p.href}
                  className="flex items-center gap-1 hover:text-white font-medium transition"
                >
                  <Phone size={12} className="text-brand shrink-0" />
                  {p.display}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link to="/" aria-label="TS SALES MART home" className="shrink-0 transition hover:opacity-95">
          <img
            src={ASSETS.logo}
            alt="TS SALES MART — Drive Your Dreams"
            className="h-16 sm:h-[72px] w-auto object-contain"
          />
        </Link>

        {/* Desktop Links */}
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.label}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `relative rounded-lg px-3.5 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-brand font-bold'
                    : 'text-gray-700 hover:text-brand hover:bg-gray-50'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
          {isStaff && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-bold transition ${
                  isActive ? 'bg-red-50 text-brand' : 'text-brand hover:bg-red-50/60'
                }`
              }
            >
              <Shield size={15} /> Dashboard
            </NavLink>
          )}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {searching ? (
            <LiveSearch onClose={() => setSearching(false)} />
          ) : (
            <button
              aria-label="Search vehicles"
              onClick={() => setSearching(true)}
              className="rounded-full p-2.5 text-gray-700 hover:bg-surface hover:text-brand transition cursor-pointer"
            >
              <Search size={19} />
            </button>
          )}

          {/* Favourites Link with Badge */}
          <Link
            to="/favorites"
            aria-label={`Favourites (${count} saved)`}
            className="relative rounded-full p-2.5 text-gray-700 hover:bg-surface hover:text-brand transition"
          >
            <Heart size={19} className={count > 0 ? 'fill-brand text-brand' : ''} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white shadow-md animate-pulse">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </Link>

          {/* Account / Login */}
          {user ? (
            <div className="relative group flex items-center">
              <Link
                to="/login"
                className="flex items-center gap-1.5 rounded-full py-1.5 px-3 text-xs font-bold text-gray-800 bg-surface hover:bg-gray-200/80 transition"
              >
                <User size={15} className="text-brand" />
                <span className="hidden md:inline max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
              </Link>
              <button
                onClick={handleLogout}
                title="Log out"
                aria-label="Log out"
                className="ml-1 p-2 text-gray-400 hover:text-brand transition rounded-full"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              aria-label="Sign in"
              className="flex items-center gap-1.5 rounded-full p-2.5 text-gray-700 hover:bg-surface hover:text-brand transition"
            >
              <User size={19} />
            </Link>
          )}

          <Link
            to="/contact"
            className="btn-primary ml-1 hidden !py-2.5 !px-4 text-xs md:inline-flex"
          >
            Sell or Enquire
          </Link>

          {/* Mobile Menu Button */}
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="rounded-full p-2 text-gray-800 hover:bg-surface lg:hidden cursor-pointer ml-1"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {open && (
        <nav aria-label="Mobile" className="border-t border-gray-100 bg-white/98 backdrop-blur-xl lg:hidden shadow-xl animate-in slide-in-from-top-3 duration-200">
          <div className="container-page flex flex-col py-4 space-y-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-3 font-semibold text-gray-800 hover:bg-surface hover:text-brand transition"
              >
                <span>{l.label}</span>
              </Link>
            ))}
            <Link
              to="/favorites"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-lg px-3 py-3 font-semibold text-gray-800 hover:bg-surface hover:text-brand transition"
            >
              <span className="flex items-center gap-2">
                <Heart size={16} className={count > 0 ? 'fill-brand text-brand' : ''} />
                Favourites
              </span>
              {count > 0 && <span className="badge bg-brand text-white">{count}</span>}
            </Link>

            {isStaff && (
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-3 font-bold text-brand bg-red-50/60"
              >
                <Shield size={16} /> Staff Dashboard
              </Link>
            )}

            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              {user ? (
                <div className="flex items-center justify-between px-3 py-2 bg-surface rounded-xl">
                  <div>
                    <p className="text-xs font-bold text-gray-900">{user.name}</p>
                    <p className="text-[11px] text-muted">{user.email}</p>
                  </div>
                  <button
                    onClick={() => { setOpen(false); handleLogout(); }}
                    className="text-xs font-semibold text-brand hover:underline flex items-center gap-1"
                  >
                    <LogOut size={13} /> Log out
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="btn-dark w-full !py-2.5 text-xs text-center"
                >
                  Sign In / Create Account
                </Link>
              )}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="btn-primary w-full !py-2.5 text-xs text-center mt-1"
              >
                Sell or Enquire
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
