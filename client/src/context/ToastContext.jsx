import { createContext, useContext, useState, useCallback } from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

const ToastContext = createContext(null)

export const useToast = () => useContext(ToastContext)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback(({ message, type = 'success', duration = 3500 }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast: addToast }}>
      {children}
      <div
        aria-live="polite"
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl shadow-2xl border text-sm transition-all duration-300 animate-in slide-in-from-bottom-5 ${
              t.type === 'error'
                ? 'bg-neutral-900 border-red-500/40 text-white'
                : t.type === 'info'
                ? 'bg-neutral-900 border-blue-500/40 text-white'
                : 'bg-neutral-900 border-neutral-700 text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              {t.type === 'error' ? (
                <AlertCircle className="text-brand shrink-0" size={18} />
              ) : t.type === 'info' ? (
                <Info className="text-blue-400 shrink-0" size={18} />
              ) : (
                <CheckCircle2 className="text-green-400 shrink-0" size={18} />
              )}
              <span className="font-medium text-xs sm:text-sm">{t.message}</span>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-gray-400 hover:text-white p-1 rounded-md transition"
              aria-label="Dismiss toast"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
