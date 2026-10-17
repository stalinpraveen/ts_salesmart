import { Outlet, ScrollRestoration, NavLink, useLocation } from 'react-router-dom'
import { Home, Car, Heart, Phone, MessageSquare } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useFavorites } from '../features/favorites/FavoritesContext'
import { BUSINESS } from '../utils/constants'

export default function MainLayout() {
  const { count } = useFavorites()
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-[#fcfcfd]">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-white focus:p-3">Skip to content</a>
      <Header />
      <main id="main" className="flex-1 pb-20 lg:pb-0"><Outlet /></main>
      <Footer />
      <ScrollRestoration />

      {/* Floating Mobile Bottom Navigation Bar */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 inset-x-0 z-40 lg:hidden border-t border-white/10 bg-[#09090b]/95 backdrop-blur-xl px-3 py-1.5 shadow-[0_-10px_25px_rgba(0,0,0,0.4)]"
        style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          {/* Home */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
                isActive ? 'text-brand font-bold' : 'text-neutral-400 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Home size={19} className={`transition-transform duration-200 ${isActive ? 'scale-110 text-brand' : ''}`} />
                <span className="text-[10px] font-semibold tracking-wider mt-0.5">Home</span>
              </>
            )}
          </NavLink>

          {/* Inventory */}
          <NavLink
            to="/vehicles"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
                isActive ? 'text-brand font-bold' : 'text-neutral-400 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Car size={19} className={`transition-transform duration-200 ${isActive ? 'scale-110 text-brand' : ''}`} />
                <span className="text-[10px] font-semibold tracking-wider mt-0.5">Stock</span>
              </>
            )}
          </NavLink>

          {/* Favourites with badge */}
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
                isActive ? 'text-brand font-bold' : 'text-neutral-400 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <Heart
                    size={19}
                    className={`transition-transform duration-200 ${
                      isActive || count > 0 ? 'text-brand fill-brand' : ''
                    } ${isActive ? 'scale-110' : ''}`}
                  />
                  {count > 0 && (
                    <span className="absolute -top-1.5 -right-2 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-brand text-[9px] font-black text-white shadow-sm ring-1 ring-[#09090b]">
                      {count > 9 ? '9+' : count}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-semibold tracking-wider mt-0.5">Saved</span>
              </>
            )}
          </NavLink>

          {/* Call Showroom */}
          <a
            href={BUSINESS.phones[0].href}
            className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-neutral-400 hover:text-brand transition-all duration-200 active:scale-95"
            aria-label="Call TS SALES MART Hotline"
          >
            <Phone size={19} className="text-brand" />
            <span className="text-[10px] font-semibold tracking-wider mt-0.5 text-neutral-300">Call</span>
          </a>

          {/* WhatsApp Showroom */}
          <a
            href={BUSINESS.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-neutral-400 hover:text-[#25D366] transition-all duration-200 active:scale-95"
            aria-label="Chat on WhatsApp"
          >
            <MessageSquare size={19} className="text-[#25D366]" />
            <span className="text-[10px] font-semibold tracking-wider mt-0.5 text-neutral-300">WhatsApp</span>
          </a>
        </div>
      </nav>
    </div>
  )
}

