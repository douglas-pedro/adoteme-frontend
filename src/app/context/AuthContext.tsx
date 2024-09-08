'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface AuthContextProps {
  user: User | null
  setUser: (user: User | null) => void
}

interface User {
  userId: string
  email: string
  name: string
  type: string
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
