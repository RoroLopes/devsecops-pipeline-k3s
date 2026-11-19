import { createContext, useContext, useState } from 'react'
import { Navigate } from 'react-router-dom'

const AuthContext = createContext(null)
const STORAGE_KEY = 'user'

// Holds the logged-in user's public info (never store tokens/passwords here).
export function AuthProvider({ children }) {
  const [user, setUserState] = useState(() => {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  })

  function setUser(u) {
    if (u) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(u))
    else sessionStorage.removeItem(STORAGE_KEY)
    setUserState(u)
  }

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

export function RequireAuth({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}
