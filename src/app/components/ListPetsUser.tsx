'use client'

import { useEffect, useState } from 'react'
import PetCardList from './PetListCards'
import { useAuth } from '../context/AuthContext'

export default function ListPetsUser() {
  const { user } = useAuth()
  const [pets, setPets] = useState<any[]>([])

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        if (user?.userId) {
          const res = await fetch(`http://localhost:4000/dev/get-pets`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              idCognito: user.userId,
              limit: 10,
              cursor: null,
            }),
          })

          if (!res.ok) {
            throw new Error('Erro ao buscar dados do pet')
          }

          const petData = await res.json()
          setPets(petData.items)
        }
      } catch (error) {
        console.error('Erro ao carregar dados do pet:', error)
      }
    }

    fetchPetData()
  }, [user?.userId])

  useEffect(() => {
    console.log('Estado atualizado de pets:', pets)
  }, [pets])

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 p-4">
        {pets.length > 0 ? (
          pets.map((pet) => <PetCardList key={pet.id} pet={pet} />)
        ) : (
          <p>Nenhum pet encontrado</p>
        )}
      </div>
    </>
  )
}
