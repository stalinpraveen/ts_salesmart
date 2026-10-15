import { Link } from 'react-router-dom'
import { Phone, MapPin } from 'lucide-react'
import { ASSETS, BUSINESS, NAV_LINKS } from '../utils/constants'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-ink text-gray-300">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="inline-block rounded-xl bg-white p-2">
            <img src={ASSETS.logo} alt="TS SALES MART logo" className="h-24 w-auto" loading="lazy" />
          </div>
          <p className="mt-4 text-sm">Quality new and pre-owned cars and vans in Sri Lanka.</p>
        </div>
        <div>
          <h2 className="font-display text-xl font-bold uppercase text-white">Quick Links</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.map((l) => <li key={l.label}><Link to={l.to} className="hover:text-white">{l.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-xl font-bold uppercase text-white">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {BUSINESS.phones.map((p) => (
              <li key={p.href}><a href={p.href} className="flex items-center gap-2 hover:text-white"><Phone size={16} className="text-brand" />{p.display}</a></li>
            ))}
            <li><a href={BUSINESS.mapUrl} target="_blank" rel="noreferrer" className="flex items-start gap-2 hover:text-white"><MapPin size={16} className="mt-0.5 shrink-0 text-brand" />{BUSINESS.address}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-500">
        © {YEAR} TS SALES MART. All rights reserved.
      </div>
    </footer>
  )
}
