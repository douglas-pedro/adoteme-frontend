'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

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

  // Carrega o usuário do localStorage quando o componente monta
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // Salva o usuário no localStorage sempre que o usuário é atualizado
  const saveUser = (user: User | null) => {
    setUser(user)
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser: saveUser }}>
      {children}
    </AuthContext.Provider>
  )
}
