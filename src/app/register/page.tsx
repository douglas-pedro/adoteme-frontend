'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Button from '../components/Button'
import Logo from '../../../public/img/logo.png'

export default function Register() {
  const router = useRouter()
  const [isDonating, setIsDonating] = useState(false)

  return (
    <main className="flex min-h-screen flex-col justify-center items-center mt-[-30px]">
      <Image alt="logo" src={Logo} />
      <p className="text-center mt-6">
        Para encontrar seu novo amigo peludo clique em{' '}
        <span className="font-bold">‘Quero adotar’</span> ou se deseja doar
        peludinhos clique em <span className="font-bold">‘Quero doar’</span>.
      </p>
      {!isDonating ? (
        <>
          <div>
            <Button
              variant="bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold py-2 px-6 rounded-lg mt-4 w-80"
              title="Quero adotar"
              onClick={() => router.push('/registerAdopt?type=adopt')}
            />
          </div>
          <div>
            <Button
              variant="bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold py-2 px-6 rounded-lg mt-4 w-80"
              title="Quero doar"
              onClick={() => setIsDonating(true)}
            />
          </div>
        </>
      ) : (
        <>
          <div>
            <Button
              variant="bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold py-2 px-6 rounded-lg mt-4 w-80"
              title="Tenho um canil"
              onClick={() => router.push('/registerAdopt?type=donatebussines')}
            />
          </div>
          <div>
            <Button
              variant="bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold py-2 px-6 rounded-lg mt-4 w-80"
              title="Sou pessoa física"
              onClick={() => router.push('/registerAdopt?type=donatperson')}
            />
          </div>
        </>
      )}
    </main>
  )
}
