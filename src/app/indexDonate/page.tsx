'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import HeaderUser from '../components/HeaderUser'
import ListPetsUser from '../components/ListPetsUser'

export default function IndexAdopter() {
  const { user, setUser } = useAuth()
  const router = useRouter()

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
    <div>
      <HeaderUser
        userName={user?.name || ''}
        userImage={''}
        onAddPet={handleAddPet}
        onLogout={handleLogout}
        userType={user?.type || ''}
      />
      {/* Envolva ListPetsUser em uma div com scroll */}
      <div className="overflow-y-scroll h-[600px] mt-4">
        {' '}
        {/* Você pode ajustar a altura conforme necessário */}
        <ListPetsUser />
      </div>
    </div>
  )
}
