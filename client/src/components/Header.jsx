import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Search, Heart, User, Menu, X, Phone, Shield } from 'lucide-react'
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
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="bg-ink text-xs text-white">
        <div className="container-page flex items-center justify-between py-1.5">
          <span className="hidden sm:block">{BUSINESS.address}</span>
          <div className="flex gap-4">
            {BUSINESS.phones.map((p) => (
              <a key={p.href} href={p.href} className="flex items-center gap-1 hover:text-red-400"><Phone size={12} />{p.display}</a>
            ))}
          </div>
        </div>
      </div>
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link to="/" aria-label="TS SALES MART home" className="shrink-0">
          <img src={ASSETS.logo} alt="TS SALES MART — Drive Your Dreams" className="h-[72px] w-auto object-contain" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.label} to={l.to} end={l.to === '/'}
              className={({ isActive }) => `rounded-md px-3 py-2 text-sm font-semibold transition hover:text-brand ${isActive && l.to === '/' ? 'text-brand' : ''}`}>
              {l.label}
            </NavLink>
          ))}
          {isStaff && (
            <NavLink to="/admin" className={({ isActive }) => `flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold transition text-brand hover:underline ${isActive ? 'underline' : ''}`}>
              <Shield size={14} /> Dashboard
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-1.5">
          {searching ? (
            <form onSubmit={submit} className="flex items-center gap-1">
              <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search brand or model" aria-label="Search vehicles" className="field w-40 sm:w-56" />
              <button type="button" aria-label="Close search" onClick={() => setSearching(false)} className="p-2 cursor-pointer"><X size={18} /></button>
            </form>
          ) : (
            <button aria-label="Search" onClick={() => setSearching(true)} className="rounded-full p-2 hover:bg-surface hover:text-brand cursor-pointer"><Search size={20} /></button>
          )}
          <Link to="/favorites" aria-label={`Favourites (${count})`} className="relative rounded-full p-2 hover:bg-surface hover:text-brand">
            <Heart size={20} className={count > 0 ? 'fill-brand text-brand' : ''} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white shadow">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </Link>
          <Link to="/login" aria-label={user ? `${user.name} - Profile` : 'Login'} className="flex items-center gap-1 rounded-full p-2 hover:bg-surface hover:text-brand">
            <User size={20} className={user ? 'text-brand' : ''} />
            {user && (
              <span className="hidden xl:inline-block max-w-[80px] truncate text-xs font-semibold">
                {user.name.split(' ')[0]}
              </span>
            )}
          </Link>
          <Link to="/contact" className="btn-primary ml-1 hidden !py-2.5 md:inline-flex">Sell or Enquire</Link>
          <button aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)} className="rounded-full p-2 lg:hidden cursor-pointer">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile" className="border-t border-gray-200 bg-white lg:hidden">
          <div className="container-page flex flex-col py-3">
            {NAV_LINKS.map((l) => (
              <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className="border-b border-gray-100 py-3 font-semibold">{l.label}</Link>
            ))}
            <Link to="/favorites" onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-gray-100 py-3 font-semibold">
              <span className="flex items-center gap-2"><Heart size={16} className={count > 0 ? 'fill-brand text-brand' : ''} /> Favourites</span>
              {count > 0 && <span className="badge bg-brand text-white">{count}</span>}
            </Link>
            {isStaff && (
              <Link to="/admin" onClick={() => setOpen(false)} className="flex items-center gap-2 border-b border-gray-100 py-3 font-semibold text-brand">
                <Shield size={16} /> Staff Dashboard
              </Link>
            )}
            <Link to="/login" onClick={() => setOpen(false)} className="border-b border-gray-100 py-3 font-semibold">
              {user ? `Account (${user.name})` : 'Sign In / Register'}
            </Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-3">Sell or Enquire</Link>
          </div>
        </nav>
      )}
    </header>
  )
}
