'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import Logo from '../../../public/img/logo.png'
import { createPet } from '../api/createPet'

const PetRegistrationForm = () => {
  const { user } = useAuth()
  console.log('USER', user)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    nome: '',
    tipo: '',
    genero: '',
    idade: '',
    condicao: '',
    capa: null as File | null,
    fotos: [] as File[],
    endereco: '',
    zipCode: '',
    number: '',
    complement: 'Nenhum',
    district: '',
    state: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleNext = () => {
    setStep(step + 1)
  }

  const handlePrev = () => {
    setStep(step - 1)
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'capa' && e.target.files) {
      setFormData({ ...formData, capa: e.target.files[0] })
    } else if (e.target.name === 'fotos' && e.target.files) {
      const filesArray = Array.from(e.target.files)
      setFormData({ ...formData, fotos: filesArray })
    }
  }

  const handleDeleteImage = (index: number) => {
    const newFotos = [...formData.fotos]
    newFotos.splice(index, 1)
    setFormData({ ...formData, fotos: newFotos })
  }

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        // Remove o prefixo "data:image/png;base64," ou qualquer outro prefixo
        const base64Data = (reader.result as string).split(',')[1]
        resolve(base64Data)
      }
      reader.onerror = (error) => reject(error)
    })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Converter capa e fotos para base64
      const capaBase64 = formData.capa
        ? await convertFileToBase64(formData.capa)
        : null
      const fotosBase64 = await Promise.all(
        formData.fotos.map((foto) => convertFileToBase64(foto)),
      )

      const petData = {
        name: formData.nome,
        type: formData.tipo,
        gender: formData.genero,
        age: Number(formData.idade),
        special_condition: formData.condicao || 'Nenhuma',
        idCognito: user?.userId,
        address: {
          zipCode: formData.zipCode,
          address: formData.endereco,
          number: Number(formData.number),
          complement: formData.complement,
          district: formData.district,
          state: formData.state,
        },
        images: [
          ...(capaBase64
            ? [
                {
                  fileName: formData.capa?.name,
                  fileContent: capaBase64,
                  avatarPath: true,
                },
              ]
            : []),
          ...fotosBase64.map((base64, index) => ({
            fileName: formData.fotos[index].name,
            fileContent: base64,
            avatarPath: false,
          })),
        ],
      }

      const response = await createPet(petData)

      router.push(`/perfilProfileCreatePet?petId=${response.pet.id}`)

      console.log('Pet criado com sucesso:', response)
    } catch (error) {
      console.error('Erro ao criar pet:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleZipCodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const zipCode = e.target.value

    // Atualiza o valor do campo de CEP
    setFormData({ ...formData, zipCode })

    // Limpa os campos de endereço ao alterar o CEP
    setFormData((prevData) => ({
      ...prevData,
      endereco: '',
      district: '',
      state: '',
    }))

    // Verifica se o CEP tem exatamente 8 dígitos
    if (zipCode.length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${zipCode}/json/`,
        )
        const data = await response.json()

        if (!data.erro) {
          setFormData((prevData) => ({
            ...prevData,
            endereco: data.logradouro,
            district: data.bairro,
            state: data.uf,
            zipCode: zipCode,
          }))
        } else {
          console.error('CEP inválido')
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error)
      }
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center max-w-md mx-auto">
      <Image className="mt-5 mb-5" alt="logo" src={Logo} />
      <div className="p-6 bg-white rounded-lg shadow-md mx-auto w-full max-w-md">
        {step === 1 && (
          <div>
            <h2 className="text-purple-900 text-lg mb-4">Nome do Pet</h2>
            <input
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-black"
              placeholder="Digite o nome do Pet"
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-purple-900 text-lg mb-4">Tipo do Pet</h2>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-black"
            >
              <option value="">Selecione</option>
              <option value="gato">Gato</option>
              <option value="cachorro">Cachorro</option>
            </select>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-purple-900 text-lg mb-4">Gênero</h2>
            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-black"
            >
              <option value="">Selecione</option>
              <option value="macho">Macho</option>
              <option value="femea">Fêmea</option>
            </select>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-purple-900 text-lg mb-4">Idade Aproximada</h2>
            <input
              name="idade"
              type="number"
              value={formData.idade}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-black"
              placeholder="Digite a idade aproximada"
            />
          </div>
        )}

        {step === 5 && (
          <div>
            <h2 className="text-purple-900 text-lg mb-4">Condição Especial</h2>
            <textarea
              name="condicao"
              value={formData.condicao}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-black"
              placeholder="Descreva qualquer condição especial"
            />
          </div>
        )}

        {step === 6 && (
          <div>
            <h2 className="text-purple-900 text-lg mb-4">Imagens do Pet</h2>

            {formData.capa && (
              <div className="flex justify-center mb-4">
                <img
                  src={URL.createObjectURL(formData.capa)}
                  alt="Capa do Pet"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
            )}

            <input
              type="file"
              name="capa"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-black mb-2"
              accept="image/*"
            />

            <input
              type="file"
              name="fotos"
              multiple
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-black"
              accept="image/*"
            />

            <div className="flex flex-wrap gap-1 mt-4">
              {formData.fotos.map((foto, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(foto)}
                    alt={`Foto ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => handleDeleteImage(index)}
                    className="absolute bottom-0 right-0 bg-red-500 text-white rounded-full py-1 px-2 m-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 7 && (
          <div>
            <h2 className="text-purple-900 text-lg mb-4">Endereço</h2>

            <input
              name="zipCode"
              value={formData.zipCode}
              onChange={handleZipCodeChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-black mb-2"
              placeholder="CEP"
            />

            <input
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-black mb-2"
              placeholder="Endereço"
            />

            <input
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-black mb-2"
              placeholder="Número"
            />

            <input
              name="complement"
              value={formData.complement}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-black mb-2"
              placeholder="Complemento"
            />

            <input
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-black mb-2"
              placeholder="Bairro"
            />

            <input
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-black"
              placeholder="Estado"
            />
          </div>
        )}

        <div className="flex justify-between mt-4">
          {step > 1 && (
            <button
              onClick={handlePrev}
              className="bg-purple-700 text-white py-2 px-4 rounded"
            >
              Voltar
            </button>
          )}
          {step < 7 && (
            <button
              onClick={handleNext}
              className="bg-purple-900 text-white py-2 px-4 rounded"
            >
              Próximo
            </button>
          )}
          {step === 7 && (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`bg-purple-900 text-white py-2 px-4 rounded ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </button>
          )}
        </div>
      </div>

      {/* Barra de progresso do formulário */}
      <div className="max-h-96 overflow-y-auto mt-8">
        <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-white mt-6 ml-8">
          <li className="mb-10 ms-6">
            <span
              className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white ${
                step > 1
                  ? 'bg-green-200 dark:bg-green-600'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              <svg
                className={`w-3.5 h-3.5 ${
                  step > 1
                    ? 'text-white dark:text-white'
                    : 'text-gray-100 dark:text-gray-300'
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
            </span>
            <h3 className="font-medium leading-tight">Nome do Pet</h3>
            <p className="text-sm">Preencha o nome</p>
          </li>
          <li className="mb-10 ms-6">
            <span
              className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white ${
                step > 2
                  ? 'bg-green-200 dark:bg-green-600'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              <svg
                className={`w-3.5 h-3.5 ${
                  step > 2
                    ? 'text-white dark:text-white'
                    : 'text-gray-100 dark:text-gray-300'
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
            </span>
            <h3 className="font-medium leading-tight">Tipo do Pet</h3>
            <p className="text-sm">Selecione o tipo do Pet</p>
          </li>
          <li className="mb-10 ms-6">
            <span
              className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white ${
                step > 3
                  ? 'bg-green-200 dark:bg-green-600'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              <svg
                className={`w-3.5 h-3.5 ${
                  step > 3
                    ? 'text-white dark:text-white'
                    : 'text-gray-100 dark:text-gray-300'
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
            </span>
            <h3 className="font-medium leading-tight">Gênero do Pet</h3>
            <p className="text-sm">Selecione o gênero do Pet</p>
          </li>
          <li className="mb-10 ms-6">
            <span
              className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white ${
                step > 4
                  ? 'bg-green-200 dark:bg-green-600'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              <svg
                className={`w-3.5 h-3.5 ${
                  step > 4
                    ? 'text-white dark:text-white'
                    : 'text-gray-100 dark:text-gray-300'
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
            </span>
            <h3 className="font-medium leading-tight">Idade Aproximada</h3>
            <p className="text-sm">Preencha a idade aproximada</p>
          </li>
          <li className="mb-10 ms-6">
            <span
              className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white ${
                step > 5
                  ? 'bg-green-200 dark:bg-green-600'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              <svg
                className={`w-3.5 h-3.5 ${
                  step > 5
                    ? 'text-white dark:text-white'
                    : 'text-gray-100 dark:text-gray-300'
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
            </span>
            <h3 className="font-medium leading-tight">Condição Especial</h3>
            <p className="text-sm">Preencha a condição especial</p>
          </li>
          <li className="mb-10 ms-6">
            <span
              className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white ${
                step > 6
                  ? 'bg-green-200 dark:bg-green-600'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              <svg
                className={`w-3.5 h-3.5 ${
                  step > 6
                    ? 'text-white dark:text-white'
                    : 'text-gray-100 dark:text-gray-300'
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
            </span>
            <h3 className="font-medium leading-tight">Imagens</h3>
            <p className="text-sm">Preencha imagens do seu pet</p>
          </li>
          <li className="mb-10 ms-6">
            <span
              className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white ${
                step > 7
                  ? 'bg-green-200 dark:bg-green-600'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              <svg
                className={`w-3.5 h-3.5 ${
                  step > 7
                    ? 'text-white dark:text-white'
                    : 'text-gray-100 dark:text-gray-300'
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
            </span>
            <h3 className="font-medium leading-tight">Endereço</h3>
            <p className="text-sm">Preencha o endereço do pet</p>
          </li>
        </ol>
      </div>
    </main>
  )
}

export default PetRegistrationForm
