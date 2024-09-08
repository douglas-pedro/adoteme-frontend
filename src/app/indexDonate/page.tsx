'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import HeaderUser from '../components/HeaderUser'
import ListPetsUser from '../components/ListPetsUser'

export default function IndexAdopter() {
  // const { user } = useAuth()
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  useEffect(() => {
    if (user) {
      localStorage.setItem('userInfo', JSON.stringify(user))
    }
  }, [user])

  const handleAddPet = () => {
    router.push('/animalRegister')
  }

  const handleLogout = () => {
    alert('Você foi deslogado!')
  }

  return (
    <>
      <HeaderUser
        userName={user?.name || ''}
        userImage={''}
        onAddPet={handleAddPet}
        onLogout={handleLogout}
      />
      <ListPetsUser idCognito={String(user?.userId)} />
    </>
  )
}
