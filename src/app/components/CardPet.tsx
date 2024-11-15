import { useState, useEffect } from 'react'
import Image from 'next/image'
import Button from './Button'
import ModalApproveAdoption from './ModalProveAdopter'

interface CardPetProps {
  id: number
  type: string
  gender: string
  age: number
  like: number
  special_condition: string
  address: {
    state: string
    [key: string]: any
  }
  images: {
    id: number
    path: string
    [key: string]: any
  }[]
  userPet: {
    idCognito: string
    [key: string]: any
  }
  name: string
  [key: string]: any
  adoptionRequests: [
    {
      id: number
      petId: number
      requesterId: string
      status: string
      createdAt: string
      requester: {
        city: string
        state: string
        email: string
        id: number
        name: string
        phone: string
      }
    },
  ]
}

interface IDatePet {
  data: CardPetProps
}

type UserInfo = {
  userId: string
  name: string
  email: string
}

export default function CardPet(data: IDatePet) {
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [user, setUser] = useState<UserInfo | null>(null)
  const [requestId, setRequestId] = useState<number | null>(null)
  const [ownerId, setOwnerId] = useState<string | null>(null)

  console.log(data)

  const handleImageLoad = () => {
    setIsLoading(false)
  }
  const handleAdoptAppove = (requestId: number, ownerId: string) => {
    setRequestId(requestId)
    setOwnerId(ownerId)
    setIsModalOpen(true)
  }

  const closeModalApprove = () => {
    setIsModalOpen(false)
    setOwnerId(null)
    setRequestId(null)
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-2 max-h-[580px] overflow-y-auto">
      <a href="#">
        <div className="flex items-center p-4">
          {isLoading && (
            <>
              <div className="w-[100px] h-[100px] flex items-center justify-center bg-gray-800 rounded-lg">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
              </div>
              <div>Carregando dados...</div>
            </>
          )}
          <Image
            className={`rounded-lg transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            src={data?.data?.images[0]?.path || '/fallback-image.jpg'}
            alt="imagem pet"
            width={100}
            height={100}
            onLoadingComplete={handleImageLoad}
          />
          {!isLoading ? (
            <div className="ml-4 text-lg font-semibold text-gray-900 dark:text-white">
              <div>Nome: {data?.data?.name || 'Toquinho'}</div>
              <div>Idade: {data?.data?.age || 'idade'}</div>
              <div>Sexo: {data?.data?.type || 'idade'}</div>
            </div>
          ) : (
            ''
          )}
        </div>
      </a>
      <div className="p-5">
        <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
          Verifique as solicitações de adoção abaixo para seu pet, entre em
          contato com os solicitantes e verifique qual será o melhor adotante
          para seu Pet.
        </p>
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Solicitações de Adoção
          </h5>
        </a>
        <div className="max-h-96 overflow-y-auto">
          {data?.data?.adoptionRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-2 mb-4"
            >
              <p>{`Solicitante: ${request.requester?.name}`}</p>
              <p className="text-sm overflow-x-auto max-w-full whitespace-nowrap">
                {`E-mail: ${request.requester?.email}`}
              </p>
              <p className="text-sm">{`Tel: ${request.requester?.phone}`}</p>
              <p className="text-sm">{`Cidade: ${request.requester?.city}`}</p>
              <p className="text-sm">{`Estado: ${request.requester?.state}`}</p>
              <div className="flex space-x-2">
                <Button
                  onClick={() =>
                    handleAdoptAppove(request?.id, String(user?.userId))
                  }
                  title="Aprovar"
                  size="small"
                  variant="bg-green-600 hover:bg-green-700 text-white text-xl font-bold py-2 px-6 rounded-lg mt-4"
                />
                <Button
                  title="Reprovar"
                  size="small"
                  variant="bg-red-600 hover:bg-red-700 text-white text-xl font-bold py-2 px-6 rounded-lg mt-4"
                />
              </div>
              {isModalOpen && (
                <ModalApproveAdoption
                  isOpen={isModalOpen}
                  requestId={Number(requestId)}
                  ownerId={String(ownerId)}
                  onClose={closeModalApprove}
                  onAdoptionSuccess={() => {}}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
