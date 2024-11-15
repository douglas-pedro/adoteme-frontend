'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Logo from '../../../public/img/logo.png'
import Pet from '../../../public/img/pet.png'
import Input from '../components/Input'
import Button from '../components/Button'
import { signIn } from '../api/signinUser'
import { useAuth } from '../context/AuthContext'
import { useAlert } from '../context/AlertContext'

const SignIn = () => {
  const { setUser, user } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { showAlert } = useAlert()

  const handleLogin = async () => {
    try {
      const response = await signIn({ username, password })

      if (response.userInfo) {
        setUser({
          userId: response.userInfo.userId,
          email: response.userInfo.email,
          name: response.userInfo.name,
          type: response.userInfo.type,
        })
        localStorage.setItem('userInfo', JSON.stringify(response.userInfo))
        showAlert('success', 'Login efetuado com sucesso!')
      }

      if (response.userInfo.type === 'donate') {
        router.push('/indexDonate')
      } else {
        router.push('/indexAdopter')
      }
    } catch (err) {
      showAlert('error', 'Erro ao tentar efetuar o login!')
      setError('Falha no login. Verifique suas credenciais.')
    }
  }

  return (
    <>
      <main className="flex h-screen flex-col justify-center items-center bg-purple-500 overflow-hidden">
        <Image alt="logo" src={Logo} />
        <div className="mt-6 w-full max-w-xs">
          <Input
            placeholder="Digite seu e-mail"
            type="email"
            className="bg-purple-500 font-bold w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mt-6 w-full max-w-xs">
          <Input
            placeholder="Digite sua senha"
            type="password"
            className="bg-purple-500 font-bold w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="w-full text-end mt-1 max-w-xs">
          <p
            className="text-md cursor-pointer text-white"
            onClick={() => router.push('/forgoutPassword')}
          >
            Esqueceu a senha ?
          </p>
        </div>
        <div className="w-full mt-6 max-w-xs">
          <Button
            variant="w-full bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold py-2 px-6 rounded-lg"
            title="Login"
            onClick={handleLogin}
          />
        </div>
        <div className="">
          <Image alt="Pet" src={Pet} className="" />
        </div>
      </main>
    </>
  )
}

export default SignIn
