import { useState, useEffect } from 'react'
import Image from 'next/image'
import ModalPetAdopter from '../components/ModalPetAdopter'
import ModalPetAdopterRemove from '../components/ModalPetAdopterRemove'
import IconLike from '../../../public/img/like.png'
import IconActive from '../../../public/img/like_active.png'
import LoadingPet from '../../../public/img/loading_pet.gif'

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
  like: number
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
  adoptionRequests: {
    id: number
    petId: number
    requesterId: string
    status: string
    createdAt: string
  }[]
  likes: {
    id: number
    idCognito: string
    petId: number
    createdAt: string
  }[]
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
  const [isModalRemoveOpen, setIsModalRemoveOpen] = useState(false)
  const [user, setUser] = useState<UserInfo | null>(null)
  const [idPet, setIdPet] = useState<number | null>(null)
  const [idAdopter, setIdAdopter] = useState<number | null>(null)

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

  const LikePet = async (idCognito: string, petId: number) => {
    try {
      const response = await fetch('http://localhost:4000/dev/pets/like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idCognito,
          petId,
        }),
      })
      const data = await response.json()
      return data.newLikeCount
    } catch (error) {
      console.error('Erro ao dar like no pet:', error)
    }
  }

  const handleLikePet = async (pet: Pet) => {
    if (user) {
      setPets((prevPets) =>
        prevPets.map((p) =>
          p.id === pet.id
            ? {
                ...p,
                like: p.likes.some((like) => like.idCognito === user.userId)
                  ? p.like - 1
                  : p.like + 1,
                likes: p.likes.some((like) => like.idCognito === user.userId)
                  ? p.likes.filter((like) => like.idCognito !== user.userId)
                  : [
                      ...p.likes,
                      {
                        id: Date.now(),
                        idCognito: user.userId,
                        petId: pet.id,
                        createdAt: new Date().toISOString(),
                      },
                    ],
              }
            : p,
        ),
      )

      try {
        await LikePet(user.userId, pet.id)
        fetchPets(filters, false, null)
      } catch (error) {
        console.error('Erro ao sincronizar o like:', error)
      }
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

  const handleAdoptRemove = (id: number) => {
    setIdAdopter(id)
    setIsModalRemoveOpen(true)
  }

  const closeRemoveModal = () => {
    setIsModalRemoveOpen(false)
    setIdAdopter(null)
  }

  const handleAdoptionSuccess = () => {
    fetchPets(filters, false, null)
  }

  return (
    <div className="p-4">
      <h1 className="text-1xl font-bold mb-4">Pets para Adoção</h1>
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

                    <div className="w-2/3 ml-4">
                      <h5 className="flex justify-between items-center text-lg font-bold tracking-tight text-gray-900 dark:text-white mb-2">
                        <span>{pet.name}</span>
                        <span className="flex items-center space-x-1">
                          <span className="mr-2">{pet.like}</span>
                          <a onClick={() => handleLikePet(pet)}>
                            {pet.likes.some(
                              (like) => like.idCognito === user?.userId,
                            ) ? (
                              <Image
                                src={IconActive}
                                width={30}
                                alt="liked pet"
                              />
                            ) : (
                              <Image src={IconLike} width={30} alt="like pet" />
                            )}
                          </a>
                        </span>
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

                  <div className="p-2">
                    {(() => {
                      // Busca a solicitação de adoção para o usuário atual
                      const adoptionRequest = pet?.adoptionRequests.find(
                        (request) => request.requesterId === user?.userId,
                      )

                      return adoptionRequest ? (
                        <>
                          <p className="text-sm text-green-300 text-center flex justify-center font-bold">
                            <Image
                              src={LoadingPet}
                              alt="loading pet"
                              width={40}
                            />
                            Você já solicitou adoção para este pet. Aguarde o
                            contato do doador.
                          </p>
                          <button
                            onClick={() =>
                              handleAdoptRemove(adoptionRequest.id)
                            }
                            className="w-full text-white font-semibold py-2 px-4 rounded-lg focus:outline-none mt-2 bg-red-500 hover:bg-red-600"
                          >
                            Cancelar Adoção
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() =>
                            handleAdopt(pet.userPet.idCognito, pet.id)
                          }
                          className="w-full text-white font-semibold py-2 px-4 rounded-lg focus:outline-none mt-2 bg-green-500 hover:bg-green-600"
                        >
                          Adotar
                        </button>
                      )
                    })()}
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

      {isModalOpen && (
        <ModalPetAdopter
          isOpen={isModalOpen}
          idUser={String(user?.userId)}
          idPet={String(idPet)}
          onClose={closeModal}
          onAdoptionSuccess={handleAdoptionSuccess}
        />
      )}
      {isModalRemoveOpen && (
        <ModalPetAdopterRemove
          isOpen={isModalRemoveOpen}
          id={Number(idAdopter)}
          onClose={closeRemoveModal}
          onAdoptionRemoveSuccess={handleAdoptionSuccess}
        />
      )}
    </div>
  )
}

export default PetList
