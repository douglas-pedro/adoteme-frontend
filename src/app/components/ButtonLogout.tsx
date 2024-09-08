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
      className="bg-red-500 text-white py-2 px-4 rounded"
    >
      Logout
    </button>
  )
}

export default LogoutButton
