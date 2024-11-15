import Image from 'next/image'
import Button from './Button'

interface CardPetProps {
  id: number
  type: string
  gender: string
  age: number
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
        id: string
        name: string
        phone: string
      }
    },
  ]
}

interface IDatePet {
  data: CardPetProps
}

export default function CardPet(data: IDatePet) {
  console.log('ccc', data?.data)
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-2 max-h-[580px] overflow-y-auto">
      <a href="#">
        <div className="flex items-center p-4">
          <Image
            className="rounded-lg"
            src={data?.data?.images[0]?.path}
            alt="imagem pet"
            width={100}
            height={100}
          />
          <div className="ml-4 text-lg font-semibold text-gray-900 dark:text-white">
            <div>Nome: {data?.data?.name || 'Toquinho'}</div>
            <div>Idade: {data?.data?.age || 'idade'}</div>
            <div>Sexo: {data?.data?.type || 'idade'}</div>
          </div>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
