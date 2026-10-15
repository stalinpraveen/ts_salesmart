import { useCompare } from './CompareContext'
import { Scale, X, ArrowRight } from 'lucide-react'
import { ASSETS } from '../../utils/constants'

export default function CompareBar() {
  const { vehicles, removeFromCompare, clearCompare, setIsModalOpen } = useCompare()

  if (!vehicles.length) return null

  return (
    <aside
      aria-label="Vehicle comparison drawer"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92vw] max-w-2xl rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-xl shadow-2xl p-3 sm:p-4 text-ink animate-in slide-in-from-bottom-5 duration-200"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto min-w-0">
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-gray-700 shrink-0">
            <Scale size={16} className="text-brand" />
            <span>Compare ({vehicles.length}/3)</span>
          </div>

          <div className="flex items-center gap-2">
            {vehicles.map((v) => {
              const id = v._id || v.id
              const img = v.images?.[0]?.url || ASSETS.logo
              return (
                <div
                  key={id}
                  className="relative flex items-center gap-2 rounded-xl border border-gray-200 bg-surface pr-2.5 pl-1.5 py-1 text-xs"
                >
                  <div className="h-7 w-9 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={img}
                      alt={v.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = ASSETS.logo
                      }}
                    />
                  </div>
                  <span className="font-semibold text-gray-800 max-w-[100px] sm:max-w-[130px] truncate">
                    {v.brand} {v.model}
                  </span>
                  <button
                    onClick={() => removeFromCompare(id)}
                    aria-label={`Remove ${v.title} from compare`}
                    className="ml-1 text-gray-400 hover:text-brand cursor-pointer"
                  >
                    <X size={13} />
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clearCompare}
            className="text-xs text-muted hover:text-ink hidden sm:inline-block cursor-pointer px-2"
          >
            Clear
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary !py-2 !px-4 text-xs font-bold whitespace-nowrap shadow-md cursor-pointer"
          >
            Compare Now <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </aside>
  )
}
