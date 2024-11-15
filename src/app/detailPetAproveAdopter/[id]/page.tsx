'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import HeaderUser from '../../components/HeaderUser'
import { useRouter } from 'next/navigation'
import CardPet from '@/app/components/CardPet'

interface DetailPetAproveAdopterProps {
  params: {
    id: string
  }
}

export default function DetailPetAproveAdopter({
  params,
}: DetailPetAproveAdopterProps) {
  const { user } = useAuth()
  const [pets, setPets] = useState()
  const router = useRouter()
  const { id } = params

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        if (id) {
          const res = await fetch(
            `http://localhost:4000/dev/pets/adoption-requests/${id}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )

          if (!res.ok) {
            throw new Error('Erro ao buscar dados do pet')
          }

          const petData = await res.json()

          setPets(petData.pet)
        }
      } catch (error) {
        console.error('Erro ao carregar dados do pet:', error)
      }
    }

    fetchPetData()
  }, [user?.userId])

  return (
    <div>
      <HeaderUser
        userName={user?.name || ''}
        userImage={''}
        onAddPet={() => {}}
        onLogout={() => {}}
        userType="adopter"
      />
      <p className="mt-2 font-bold" onClick={() => router.back()}>
        {' '}
        {'< Voltar'}
      </p>
      <CardPet data={pets} />
    </div>
  )
}
