import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import IconLike from '../../../public/img/like.png'
import IconActive from '../../../public/img/like_active.png'

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
  like: number
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
        <div className="w-2/3 ml-4">
          <h2 className="text-sm font-bold flex justify-between items-center">
            {pet.name}
            {pet.like > 0 ? (
              <p className="flex items-center">
                <span>{pet.like}</span>
                <Image
                  src={IconActive}
                  width={30}
                  alt="liked pet"
                  className="ml-2"
                />
              </p>
            ) : (
              <Image src={IconLike} width={30} alt="like pet" />
            )}
          </h2>

          <p className="text-sm ">Tipo: {pet.type}</p>
          <p className="text-sm ">Idade: {pet.age} anos</p>
          <p className="text-sm ">Patologia: {pet.special_condition}</p>
          <p className="text-sm ">Sexo: {pet.gender}</p>
        </div>
      </div>

      {pet.adoptionRequests.length > 0 && (
        <div className="mt-4 flex justify-center">
          <button className="w-full px-4 py-2 bg-green-500 text-white text-sm font-bold rounded-lg hover:bg-green-600">
            Solicitações de Doação em Aberto
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
