import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { api } from '../../services/api'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/auth/me').then((r) => setUser(r.data.data)).catch(() => setUser(null)).finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (body) => { const r = await api.post('/auth/login', body); setUser(r.data.data); return r.data.data }, [])
  const register = useCallback(async (body) => { const r = await api.post('/auth/register', body); setUser(r.data.data); return r.data.data }, [])
  const logout = useCallback(async () => { await api.post('/auth/logout').catch(() => {}); setUser(null) }, [])

  const isStaff = user?.role === 'staff' || user?.role === 'admin'
  return <AuthContext.Provider value={{ user, loading, isStaff, login, register, logout }}>{children}</AuthContext.Provider>
}
