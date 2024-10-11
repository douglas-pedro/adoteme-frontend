'use client'

import { useRouter } from 'next/navigation'
import { logout } from '../api/signupUser'

const LogoutButton = () => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/signin')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="w-10 h-10 rounded-full bg-purple-900 hover:bg-purple-800 flex items-center justify-center"
      title="Deslogar"
    >
      <span className="text-xl">🔓</span>
    </button>
  )
}

export default LogoutButton
