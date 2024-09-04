'use client'

import Image from 'next/image'
import Button from './components/Button'
import Logo from '../../public/img/logo.png'
import Cat from '../../public/img/cat.png'
import Dog from '../../public/img/dog.png'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Image alt="logo" src={Cat} className="ml-24" />
      <Image alt="logo" src={Logo} className="mt-[-20px]" />
      <h1 className="text-3xl font-bold mt-4">Olá, amigo(a) </h1>
      <p className="text-center text-lg mt-6">
        Aqui você irá encontrar seu novo amigo peludo bem pertinho de você ou
        cadastrar seu local de adoção.
      </p>

      <Button
        variant="bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold py-2 px-6 rounded-lg mt-4"
        size="large"
        onClick={() => router.push('/register')}
        title="Vamos começar?"
      />
      <p className="mt-2">
        Já possui cadastro?{' '}
        <Link href={'/signin'} className="font-bold">
          {' '}
          Log In{' '}
        </Link>
      </p>
      <Image alt="logo" src={Dog} className="mt-[-160px] ml-[-70px] z-[-1]" />
    </main>
  )
}
