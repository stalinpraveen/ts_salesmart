import { Outlet, ScrollRestoration } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FloatingWhatsApp from '../components/FloatingWhatsApp'
import CompareBar from '../features/compare/CompareBar'
import CompareModal from '../features/compare/CompareModal'

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col relative selection:bg-brand selection:text-white">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-white focus:p-3">Skip to content</a>
      <Header />
      <main id="main" className="flex-1"><Outlet /></main>
      <Footer />
      <FloatingWhatsApp />
      <CompareBar />
      <CompareModal />
      <ScrollRestoration />
    </div>
  )
}
