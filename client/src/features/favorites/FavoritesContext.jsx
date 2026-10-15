import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { api } from '../../services/api'
import { useAuth } from '../auth/AuthContext'

const FavoritesContext = createContext(null)

export const useFavorites = () => useContext(FavoritesContext)

const LOCAL_KEY = 'ts_sales_mart_favorites'

export function FavoritesProvider({ children }) {
  const { user } = useAuth()
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]')
    } catch {
      return []
    }
  })
  const [favoriteVehicles, setFavoriteVehicles] = useState([])
  const [loading, setLoading] = useState(false)

  // Sync with server when user logs in or changes
  useEffect(() => {
    if (user) {
      setLoading(true)
      api.get('/favorites')
        .then((res) => {
          const serverIds = res.data.ids || []
          // Merge local guest favorites into server if any exist
          const localOnly = favoriteIds.filter((id) => !serverIds.includes(id))
          if (localOnly.length > 0) {
            Promise.all(localOnly.map((id) => api.post(`/favorites/${id}`).catch(() => {})))
              .then(() => {
                setFavoriteIds([...new Set([...serverIds, ...localOnly])])
                localStorage.removeItem(LOCAL_KEY)
              })
          } else {
            setFavoriteIds(serverIds)
          }
          setFavoriteVehicles(res.data.data || [])
        })
        .catch(() => {})
        .finally(() => setLoading(false))
    } else {
      // Guest mode: save to localStorage
      try {
        const local = JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]')
        setFavoriteIds(local)
      } catch {
        setFavoriteIds([])
      }
    }
  }, [user])

  const toggleFavorite = useCallback(async (vehicle) => {
    const id = vehicle._id || vehicle.id
    if (!id) return

    setFavoriteIds((prev) => {
      const exists = prev.includes(id)
      const next = exists ? prev.filter((x) => x !== id) : [...prev, id]
      if (!user) {
        localStorage.setItem(LOCAL_KEY, JSON.stringify(next))
      }
      return next
    })

    if (user) {
      const exists = favoriteIds.includes(id)
      try {
        if (exists) {
          await api.delete(`/favorites/${id}`)
        } else {
          await api.post(`/favorites/${id}`)
        }
      } catch (err) {
        console.error('Favorite toggle failed on server:', err)
      }
    }
  }, [user, favoriteIds])

  const isFavorite = useCallback((id) => favoriteIds.includes(id), [favoriteIds])

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        favoriteVehicles,
        isFavorite,
        toggleFavorite,
        count: favoriteIds.length,
        loading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}
