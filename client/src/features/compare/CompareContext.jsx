import { createContext, useContext, useState, useEffect } from 'react'
import { useToast } from '../../context/ToastContext'

const CompareContext = createContext(null)
const STORAGE_KEY = 'ts_compare_vehicles'

export function CompareProvider({ children }) {
  const [vehicles, setVehicles] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { showToast } = useToast()

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles))
    } catch {
      // ignore
    }
  }, [vehicles])

  const addToCompare = (vehicle) => {
    if (!vehicle) return
    const id = vehicle._id || vehicle.id
    if (vehicles.some((v) => (v._id || v.id) === id)) {
      showToast({ message: 'Vehicle already added to comparison.', type: 'info' })
      return
    }
    if (vehicles.length >= 3) {
      showToast({ message: 'You can compare up to 3 vehicles at once.', type: 'info' })
      return
    }
    setVehicles((prev) => [...prev, vehicle])
    showToast({ message: `Added ${vehicle.brand} ${vehicle.model} to comparison.`, type: 'success' })
  }

  const removeFromCompare = (id) => {
    setVehicles((prev) => prev.filter((v) => (v._id || v.id) !== id))
  }

  const clearCompare = () => {
    setVehicles([])
  }

  const isInCompare = (id) => {
    return vehicles.some((v) => (v._id || v.id) === id)
  }

  const toggleCompare = (vehicle) => {
    const id = vehicle._id || vehicle.id
    if (isInCompare(id)) {
      removeFromCompare(id)
      showToast({ message: `Removed ${vehicle.brand} ${vehicle.model} from comparison.`, type: 'info' })
    } else {
      addToCompare(vehicle)
    }
  }

  return (
    <CompareContext.Provider
      value={{
        vehicles,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        toggleCompare,
        isModalOpen,
        setIsModalOpen,
      }}
    >
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const context = useContext(CompareContext)
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider')
  }
  return context
}
