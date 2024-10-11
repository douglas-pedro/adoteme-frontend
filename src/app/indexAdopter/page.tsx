'use client'

import { useEffect, useState } from 'react'
import withAuth from '../hoc/withAuth'
import HeaderUser from '../components/HeaderUser'
import PetList from '../components/PetList'

type UserInfo = {
  userId: string
  name: string
  email: string
}

const IndexAdopter = () => {
  const [user, setUser] = useState<UserInfo | null>(null)

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

  return (
    <div className="">
      <HeaderUser
        userName={user?.name || ''}
        userImage={''}
        onAddPet={() => {}}
        onLogout={() => {}}
        userType="adopter"
      />

      <PetList />
    </div>
  )
}

export default withAuth(IndexAdopter)
