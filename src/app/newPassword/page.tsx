'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Input from '../components/Input'
import Button from '../components/Button'
import Logo from '../../../public/img/logo.png'
import ModalNewPassword from '../components/ModalNewPassword'

export default function NewPassword() {
  const router = useRouter()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <main className="flex min-h-screen flex-col justify-center items-center mt-[-50px]">
      <Image alt="logo" src={Logo} />
      <div className="mt-6 w-full">
        <p className="text-xl font-semibold">Cadastrar nova senha</p>
        <p className="text-lg font-semibold">
          Cadastre uma nova senha com os seguintes requisitos:
        </p>
        <ol className="list-disc list-inside text-sm font-semibold mt-2 space-y-1">
          <li>Mínimo 8 caracteres</li>
          <li>Pelo menos uma letra maiúscula</li>
          <li>Pelo menos um caractere numérico</li>
          <li>Pelo menos um caractere especial</li>
        </ol>
      </div>
      <div className="mt-8">
        <Input
          type="email"
          placeholder="Digite sua nova senha"
          className="bg-purple-500 font-bold"
        />
      </div>
      <div className="mt-6">
        <Input
          type="email"
          placeholder="Repita sua nova senha"
          className="bg-purple-500 font-bold"
        />
      </div>
      <div className="w-full mt-4">
        <Button
          variant="w-full bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold py-2 px-6 rounded-lg mt-4 "
          title="Cadastrar"
          onClick={openModal}
        />
        <ModalNewPassword isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </main>
  )
}
