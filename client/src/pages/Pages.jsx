import { Link } from 'react-router-dom'
import { Phone, MapPin } from 'lucide-react'
import { BUSINESS } from '../utils/constants'
import InquiryForm from '../features/inquiries/InquiryForm'
import { usePageTitle } from '../hooks/usePageTitle'

export function PagePlaceholder({ title, phase, children }) {
  usePageTitle(`${title} | TS SALES MART`)
  return (
    <div className="container-page py-20 text-center">
      <h1 className="section-title">{title}</h1>
      <p className="mx-auto mt-4 max-w-md text-muted">{children || `This page is being built in ${phase}.`}</p>
      <Link to="/" className="btn-primary mt-6">Back to Home</Link>
    </div>
  )
}

export const Favorites = () => <PagePlaceholder title="Favourites" phase="Phase 7 (customer accounts)" />
export const Login = () => <PagePlaceholder title="Login" phase="Phase 6 (authentication)" />
export const NotFound = () => <PagePlaceholder title="Page not found">The page you are looking for does not exist.</PagePlaceholder>

export function About() {
  usePageTitle('About Us | TS SALES MART')
  return (
    <div className="container-page max-w-3xl py-16">
      <h1 className="section-title">About Us</h1>
      <p className="mt-4 text-gray-700">TS SALES MART — Drive Your Dreams — sells new and pre-owned cars and vans from Uduvil, Chunnakam, Sri Lanka. Contact our team to discuss buying, selling or exchanging a vehicle.</p>
    </div>
  )
}

export function Contact() {
  usePageTitle('Contact Us | TS SALES MART')
  return (
    <div className="container-page max-w-3xl py-16">
      <h1 className="section-title">Contact Us</h1>
      <p className="mt-4 flex items-start gap-2"><MapPin className="mt-1 shrink-0 text-brand" size={18} />{BUSINESS.address}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        {BUSINESS.phones.map((p) => <a key={p.href} href={p.href} className="btn-primary"><Phone size={16} />Call {p.display}</a>)}
        <a href={BUSINESS.mapUrl} target="_blank" rel="noreferrer" className="btn-outline-dark"><MapPin size={16} />View on Map</a>
      </div>
      <h2 className="mt-10 font-display text-2xl font-bold uppercase">Send Us a Message</h2>
      <div className="mt-4 max-w-xl"><InquiryForm /></div>
    </div>
  )
}
