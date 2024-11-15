'use client'

import { useRouter } from 'next/navigation'
import { logout } from '../api/signupUser'
import { useAlert } from '../context/AlertContext'

const LogoutButton = () => {
  const router = useRouter()
  const { showAlert } = useAlert()

  const handleLogout = async () => {
    try {
      await logout()
      showAlert('success', 'Usuário desconectado com sucesso!')
      router.push('/signin')
    } catch (error) {
      showAlert('error', 'Erro ao tentar desconectar o usuário!')
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
