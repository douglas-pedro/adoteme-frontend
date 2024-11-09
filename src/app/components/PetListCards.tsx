import React from 'react'
import Image from 'next/image'

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

type Pet = {
  id: number
  name: string
  type: string
  gender: string
  age: number
  special_condition: string
  address: Address
  images: ImageObj[]
}

const PetCardList: React.FC<{ pet: Pet }> = ({ pet }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex items-center">
        <Image
          src={pet.images[0].path}
          alt={pet.name}
          width={58}
          height={58}
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div className="ml-4">
          <h2 className="text-xl font-bold text-gray-800">{pet.name}</h2>
          <p className="text-gray-600">{pet.type}</p>
          <p className="text-gray-600">{pet.age} anos</p>
          <p className="text-gray-600">{pet.special_condition}</p>
          <p className="text-gray-600">{pet.gender}</p>
        </div>
      </div>

      {/* Botões de Aprovar e Reprovar Doação */}
      <div className="mt-4 flex justify-end space-x-4">
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          Aprovar Doação
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Reprovar Doação
        </button>
      </div>

      {/* Endereço */}
      {/* <div className="mt-4">
        <p className="text-gray-500">
          {`${pet.address.address}, ${pet.address.number}, ${pet.address.district}, ${pet.address.state}`}
        </p>
        <p className="text-gray-500">CEP: {pet.address.zipCode}</p>
      </div> */}

      {/* Galeria de imagens adicionais (caso existam) */}
      {/* <div className="mt-4 flex space-x-4">
        {pet.images.map((img) => (
          <Image
            key={img.id}
            src={img.path}
            alt={img.fileName}
            width={48}
            height={48}
            className="w-20 h-20 object-cover rounded-md"
          />
        ))}
      </div> */}
    </div>
  )
}

export default PetCardList
