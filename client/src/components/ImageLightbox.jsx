import { useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function ImageLightbox({ images = [], currentIndex = 0, onClose, onIndexChange }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
      if (e.key === 'ArrowLeft') {
        onIndexChange?.((currentIndex - 1 + images.length) % images.length)
      }
      if (e.key === 'ArrowRight') {
        onIndexChange?.((currentIndex + 1) % images.length)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [currentIndex, images.length, onClose, onIndexChange])

  if (!images.length) return null

  const currentSrc = typeof images[currentIndex] === 'string' ? images[currentIndex] : images[currentIndex]?.url

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-black/95 backdrop-blur-xl animate-in fade-in duration-200 select-none"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 sm:p-6 text-white z-10">
        <span className="rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold backdrop-blur-md">
          {currentIndex + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          aria-label="Close preview"
          className="rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 transition cursor-pointer"
        >
          <X size={22} />
        </button>
      </div>

      {/* Main Image Center Stage */}
      <div className="relative flex flex-1 items-center justify-center p-4">
        {images.length > 1 && (
          <button
            onClick={() => onIndexChange?.((currentIndex - 1 + images.length) % images.length)}
            aria-label="Previous photo"
            className="absolute left-4 sm:left-8 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/25 transition cursor-pointer"
          >
            <ChevronLeft size={28} />
          </button>
        )}

        <img
          key={currentSrc}
          src={currentSrc}
          alt={`Photo ${currentIndex + 1}`}
          className="max-h-[75vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl transition-all duration-300 animate-in zoom-in-95"
        />

        {images.length > 1 && (
          <button
            onClick={() => onIndexChange?.((currentIndex + 1) % images.length)}
            aria-label="Next photo"
            className="absolute right-4 sm:right-8 z-10 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md hover:bg-white/25 transition cursor-pointer"
          >
            <ChevronRight size={28} />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 p-4 sm:p-6 overflow-x-auto">
          {images.map((img, i) => {
            const src = typeof img === 'string' ? img : img?.url
            return (
              <button
                key={src + i}
                onClick={() => onIndexChange?.(i)}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all cursor-pointer ${
                  i === currentIndex ? 'border-brand scale-105 shadow-lg' : 'border-white/20 opacity-50 hover:opacity-100'
                }`}
              >
                <img src={src} alt={`Thumbnail ${i + 1}`} className="h-full w-full object-cover" />
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
