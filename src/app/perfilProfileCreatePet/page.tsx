'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Logo from '../../../public/img/logo.png'

interface Pet {
  id: string
  name: string
  type: string
  gender: string
  age: number
  special_condition: string
  address: {
    address: string
    district: string
    state: string
  }
  images: { avatarPath: boolean; path: string }[]
}

const ProfilePage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const petId = searchParams.get('petId')
  const [pet, setPet] = useState<Pet | null>(null)

  useEffect(() => {
    if (petId) {
      // Fazer uma requisição para buscar os dados do pet com o petId
      const fetchPetData = async () => {
        try {
          const res = await fetch(`http://localhost:4000/dev/get-pets`, {
            method: 'POST', // Supondo que o método seja POST para buscar os dados do pet
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: petId }),
          })

          if (!res.ok) {
            throw new Error('Erro ao buscar dados do pet')
          }

          const petData = await res.json()

          setPet(petData.items[0])
        } catch (error) {
          console.error('Erro ao carregar dados do pet:', error)
        }
      }

      fetchPetData()
    }
  }, [petId])

  if (!pet) {
    return <p className="text-center mt-5">Carregando dados do pet...</p>
  }

  return (
    <main className="flex min-h-screen flex-col items-center max-w-md mx-auto">
      <Image className="mt-8" alt="logo" src={Logo} />
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden mt-4">
        {/* Imagem do pet */}
        <div className="w-full h-64 bg-gray-200 flex justify-center items-center">
          {pet.images && pet.images.length > 0 ? (
            <Image
              src={pet.images.find((img) => img.avatarPath)?.path}
              alt={pet.name}
              width={256}
              height={256}
              className="object-cover h-full w-full"
            />
          ) : (
            <p className="text-gray-500">Sem imagem</p>
          )}
        </div>

        {/* Detalhes do pet */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{pet.name}</h2>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Tipo:</span> {pet.type}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Gênero:</span> {pet.gender}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Idade:</span> {pet.age} anos
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Condição Especial:</span>{' '}
            {pet.special_condition}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Endereço:</span>{' '}
            {pet.address.address}, {pet.address.district}, {pet.address.state}
          </p>
        </div>
      </div>
    </main>
  )
}

export default ProfilePage
