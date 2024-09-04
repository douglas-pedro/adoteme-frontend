'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Input from '../components/Input'
import Button from '../components/Button'
import ModalConfirmeCode from '../components/ModalConfirmeCode'
import Logo from '../../../public/img/logo.png'
import { createUser, CreateUserPayload } from '../api/createUser'

export default function RegisterAdot() {
  const [formData, setFormData] = useState<CreateUserPayload>({
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
    email: '',
    phoneNumber: '',
    cep: '',
    address: '',
    city: '',
    complement: '',
    district: '',
    number: '',
    phone: '',
    responsibleName: '',
    state: '',
    type: 'adopt',
  })
  const [idUser, setIdUser] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'email') {
      setFormData((prevData) => ({
        ...prevData,
        email: value,
        username: value,
      }))
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async () => {
    try {
      const result = await createUser(formData)
      if (result && result.user) {
        setIdUser(result.user)
        setIsModalOpen(true)
        console.log('User created successfully:', result.user)
      } else {
        throw new Error('User object not found in response')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleConfirmCode = async (code: string) => {
    try {
      const response = await fetch(
        'http://localhost:4000/dev/confirm-sign-up-user',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: idUser,
            confirmationCode: code,
          }),
        },
      )

      if (response.ok) {
        // Verifica se o status da resposta é 200
        const result = await response.json()
        console.log('User confirmed successfully:', result)
        setIsModalOpen(false)
        router.push('/signin') // Redireciona para a página de login
      } else {
        throw new Error('Failed to confirm code')
      }
    } catch (error) {
      console.error('Error confirming code:', error)
    }
  }

  return (
    <main className="flex flex-col justify-center items-center mt-[-5px]">
      <Image alt="logo" src={Logo} />
      <div className="mt-4">
        <Input
          placeholder="Nome Completo"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="bg-purple-500 font-bold"
        />
      </div>
      <div className="mt-2">
        <Input
          placeholder="CEP"
          type="text"
          name="cep"
          value={formData.cep}
          onChange={handleChange}
          className="bg-purple-500 font-bold"
        />
      </div>
      <div className="mt-2">
        <Input
          placeholder="Logradouro"
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="bg-purple-500 font-bold"
        />
      </div>
      <div className="mt-2">
        <Input
          placeholder="Número"
          type="text"
          name="number"
          value={formData.number}
          onChange={handleChange}
          className="bg-purple-500 font-bold"
        />
      </div>
      <div className="mt-2">
        <Input
          placeholder="Complemento"
          type="text"
          name="complement"
          value={formData.complement}
          onChange={handleChange}
          className="bg-purple-500 font-bold"
        />
      </div>
      <div className="mt-2">
        <Input
          placeholder="Bairro"
          type="text"
          name="district"
          value={formData.district}
          onChange={handleChange}
          className="bg-purple-500 font-bold"
        />
      </div>
      <div className="mt-2 w">
        <Input
          placeholder="Cidade"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="bg-purple-500 font-bold"
        />
      </div>
      <div className="mt-2">
        <Input
          placeholder="Estado"
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="bg-purple-500 font-bold"
        />
      </div>
      <div className="mt-2">
        <Input
          placeholder="Telefone"
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="bg-purple-500 font-bold"
        />
      </div>
      <div className="mt-2">
        <Input
          placeholder="E-mail"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="bg-purple-500 font-bold"
        />
      </div>
      <div className="mt-2">
        <Input
          placeholder="Senha"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="bg-purple-500 font-bold"
        />
      </div>
      <div className="mt-2">
        <Input
          placeholder="Confirmar Senha"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="bg-purple-500 font-bold"
        />
      </div>
      <div className="w-full">
        <Button
          variant="bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold rounded-lg mt-4 w-full"
          title="Cadastrar"
          onClick={handleSubmit}
        />
      </div>
      {isModalOpen && (
        <ModalConfirmeCode
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmCode}
        />
      )}
    </main>
  )
}
