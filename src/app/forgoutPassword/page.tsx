'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import Logo from '../../../public/img/logo.png'
import Cat from '../../../public/img/catfull.png'
import { verifyEmailUser } from '../api/verifyEmailUser'

export default function ForgoutPassword() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordReset = async () => {
    setMessage(null)
    try {
      const response = await verifyEmailUser({ email })

      if (response.userExists) {
        router.push('/newPassword')
      } else {
        setMessage('O e-mail não existe em nossa base de dados.')
      }
    } catch (error) {
      console.error('Erro ao verificar o e-mail:', error)
      setMessage(
        'Houve um erro ao tentar verificar o e-mail. Por favor, tente novamente.',
      )
    }
  }

  return (
    <main className="flex min-h-screen flex-col justify-center items-center">
      <Image alt="logo" src={Logo} />
      <div className="mt-8">
        {message && (
          <p className="text-red-700 text-sm text-center mb-2  mt-4 font-bold">
            {message}
          </p>
        )}

        <Input
          type="email"
          placeholder="Digite seu e-mail"
          className="bg-purple-500 font-bold"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="w-full mt-4">
        <Button
          variant="w-full bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold py-2 px-6 rounded-lg mt-4"
          title="Alterar Senha"
          onClick={handlePasswordReset}
        />
      </div>
      <Image alt="logo" src={Cat} className="mb-[-250px] ml-64" />
    </main>
  )
}
