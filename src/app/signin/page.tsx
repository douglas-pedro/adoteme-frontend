'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Logo from '../../../public/img/logo.png'
import Pet from '../../../public/img/pet.png'
import Input from '../components/Input'
import Button from '../components/Button'

export default function SignIn() {
  const router = useRouter()

  return (
    <>
      <main className="flex h-screen flex-col justify-center items-center bg-purple-500 overflow-hidden">
        <Image alt="logo" src={Logo} />
        <div className="mt-6 w-full max-w-xs">
          <Input
            placeholder="Digite seu e-mail"
            type="email"
            className="bg-purple-500 font-bold w-full"
          />
        </div>
        <div className="mt-6 w-full max-w-xs">
          <Input
            placeholder="Digite sua senha"
            type="password"
            className="bg-purple-500 font-bold w-full"
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
          />
        </div>
        <div className="">
          <Image alt="Pet" src={Pet} className="" />
        </div>
      </main>
    </>
  )
}
