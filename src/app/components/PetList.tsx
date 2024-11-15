import { useState, useEffect } from 'react'
import Image from 'next/image'
import ModalPetAdopter from '../components/ModalPetAdopter'

interface Pet {
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
    },
  ]
}

type UserInfo = {
  userId: string
  name: string
  email: string
}

const PetList: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [cursor, setCursor] = useState<number | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [user, setUser] = useState<UserInfo | null>(null)
  const [idPet, setIdPet] = useState<number | null>(null)

  const [filters, setFilters] = useState({
    type: '',
    gender: '',
    state: '',
  })

  const limit = 5

  const fetchPets = async (
    filters: any,
    append: boolean = false,
    cursorParam: number | null = cursor,
  ) => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:4000/dev/get-pets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          limit,
          ...(cursorParam ? { cursor: cursorParam } : {}),
          ...filters,
        }),
      })
      const data = await response.json()
      if (append) {
        setPets((prevPets) => [...prevPets, ...data.items])
      } else {
        setPets(data.items)
      }
      setCursor(data.cursor)
    } catch (error) {
      console.error('Erro ao buscar pets:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPets(filters)
  }, [])

  const handleLoadMore = () => {
    if (cursor) {
      fetchPets(filters, true, cursor)
    }
  }

  const toggleFilterMenu = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleFilterApply = () => {
    setCursor(null)

    fetchPets(filters, false, null)
    setIsFilterOpen(false)
  }

  const handleClearFilters = () => {
    const initialFilters = { type: '', gender: '', state: '' }
    setFilters(initialFilters)
    setCursor(null)
    fetchPets(initialFilters, false, null)
  }

  const handleAdopt = (userId: string, petId: number) => {
    setIdPet(petId)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setIdPet(null)
  }

  return (
    <div className="p-4">
      <h1 className="text-1xl font-bold mb-4">Pets para Adoção</h1>

      {/* Botão suspenso de Filtro */}
      <div className="relative inline-block text-left mb-4">
        <button
          onClick={toggleFilterMenu}
          className="inline-flex justify-center w-full rounded-md border border-purple-700 shadow-sm px-4 py-2 bg-purple-950 text-sm font-medium text-white hover:bg-purple-950 focus:outline-none"
        >
          Filtros
        </button>

        {isFilterOpen && (
          <div className="origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-purple-800 ring-1 ring-black ring-opacity-5">
            <div className="p-4 space-y-2">
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-white"
                >
                  Tipo
                </label>
                <select
                  id="type"
                  name="type"
                  className="mt-1 block w-full rounded-md border-gray-900 text-gray-900"
                  value={filters.type}
                  onChange={handleFilterChange}
                >
                  <option value="">Todos</option>
                  <option value="cachorro">Cachorro</option>
                  <option value="gato">Gato</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-white"
                >
                  Gênero
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm"
                  value={filters.gender}
                  onChange={handleFilterChange}
                >
                  <option value="">Todos</option>
                  <option value="macho">Macho</option>
                  <option value="fêmea">Fêmea</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-white"
                >
                  Estado
                </label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  placeholder="Estado"
                  className="mt-1 block w-full rounded-md border-gray-300 text-gray-900 shadow-sm"
                  value={filters.state}
                  onChange={handleFilterChange}
                />
              </div>

              <button
                onClick={handleFilterApply}
                className="mt-2 w-full bg-purple-900 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded focus:outline-none"
              >
                {loading ? (
                  <div className="flex justify-center">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
                  </div>
                ) : (
                  'Filtrar'
                )}
              </button>
              <button
                onClick={handleClearFilters}
                className="mt-2 w-full bg-gray-900 hover:bg-gray-300 text-white font-semibold py-2 px-4 rounded focus:outline-none"
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Spinner enquanto filtra ou carrega pets */}
      {loading && pets.length === 0 ? (
        <div className="flex justify-center mt-4">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          <p className="ml-4">Carregando pets...</p>
        </div>
      ) : (
        <div>
          <div className="h-[470px] overflow-y-scroll">
            {pets.length === 0 ? (
              <p>Nenhum pet encontrado.</p>
            ) : (
              pets.map((pet) => (
                <div
                  key={pet.id}
                  className="flex flex-col bg-gray-800 rounded-lg shadow mb-4"
                >
                  <div className="flex items-center p-4">
                    {/* Imagem do Pet */}
                    <div className="w-1/3">
                      <Image
                        className={
                          pet?.adoptionRequests[0]
                            ? 'object-cover border-4 border-purple-800 rounded-lg'
                            : 'object-cover border-4 border-green-500 rounded-lg'
                        }
                        src={pet.images[0]?.path || '/default-image.jpg'}
                        alt={`Pet ${pet.id}`}
                        width={200}
                        height={200}
                      />
                    </div>

                    {/* Informações do Pet */}
                    <div className="w-2/3 ml-4">
                      <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                        {pet.name}
                      </h5>
                      <p className="text-sm">
                        {pet?.adoptionRequests[0]?.status === 'PENDING'
                          ? `Solicitado Adoção (${pet?.adoptionRequests.length})`
                          : ''}
                      </p>
                      <p className="text-sm text-white">
                        Idade: {pet.age} anos
                      </p>
                      <p className="text-sm font-normal text-white">
                        Condição Especial: {pet.special_condition || 'Nenhuma'}
                      </p>
                      <p className="text-sm font-normal text-white">
                        Estado: {pet.address.state}
                      </p>
                      <p className="text-sm font-normal text-white">
                        Sexo: {pet.gender}
                      </p>
                    </div>
                  </div>

                  {/* Botão Adotar */}
                  <div className="p-2">
                    <button
                      onClick={() => handleAdopt(pet.userPet.idCognito, pet.id)}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none"
                    >
                      Adotar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cursor && (
            <div className="mt-2">
              <button
                onClick={handleLoadMore}
                className="w-full bg-purple-900 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded focus:outline-none"
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 mr-2"></div>
                    Carregando mais pets...
                  </div>
                ) : (
                  'Carregar Mais'
                )}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Modal de Adoção */}
      {isModalOpen && (
        <ModalPetAdopter
          isOpen={isModalOpen}
          idUser={String(user?.userId)}
          idPet={String(idPet)}
          onClose={closeModal}
        />
      )}
    </div>
  )
}

export default PetList
