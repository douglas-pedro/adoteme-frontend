import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Address = {
  zipCode: string
  address: string
  number: number
  complement: string
  district: string
  state: string
}

type ImageObj = {
  id: number
  fileName: string
  avatarPath: boolean
  path: string
}

type TAdoptionRequests = {
  createAt: string
  id: number
  petId: number
  resquesterId: string
  status: string
}

type Pet = {
  id: number
  name: string
  type: string
  gender: string
  age: number
  special_condition: string
  address: Address
  images: ImageObj[]
  adoptionRequests: TAdoptionRequests[]
}

const PetCardList: React.FC<{ pet: Pet }> = ({ pet }) => {
  console.log('PET:', pet.adoptionRequests.length)
  console.log('PET IMAGES:', pet.images[0].path)

  const CardContent = (
    <div className="bg-gray-800 text-white shadow-md rounded-lg p-4">
      <div className="flex items-center">
        <Image
          src={pet.images[0].path}
          alt={pet.name}
          width={58}
          height={58}
          className={
            pet.adoptionRequests.length > 0
              ? 'w-24 h-24 object-cover rounded-lg border-4 border-green-500'
              : 'w-24 h-24 object-cover rounded-lg border-4 border-purple-500'
          }
        />
        <div className="ml-4">
          <h2 className="text-sm font-bold">{pet.name}</h2>
          <p className="text-sm ">Tipo: {pet.type}</p>
          <p className="text-sm ">Idade: {pet.age} anos</p>
          <p className="text-sm ">Patologia: {pet.special_condition}</p>
          <p className="text-sm ">Sexo: {pet.gender}</p>
        </div>
      </div>

      {pet.adoptionRequests.length > 0 && (
        <div className="mt-4 flex justify-center">
          <button className="w-full px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600">
            Solicitações de Doação
          </button>
        </div>
      )}
    </div>
  )

  return pet.adoptionRequests.length > 0 ? (
    <Link href={`/detailPetAproveAdopter/${pet.adoptionRequests[0]?.petId}`}>
      {CardContent}
    </Link>
  ) : (
    CardContent
  )
}

export default PetCardList
