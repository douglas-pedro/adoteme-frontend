'use client'

import React from 'react'
import Image from 'next/image'
import user from '../../../public/img/user.png'

type HeaderUserProps = {
  userImage: string
  userName: string
  onAddPet: () => void
  onLogout: () => void
}

const HeaderUser: React.FC<HeaderUserProps> = ({
  userImage,
  userName,
  onAddPet,
  onLogout,
}) => {
  return (
    <header className="flex items-center justify-between p-4 bg-purple-700 text-white rounded-lg">
      {/* User Info */}
      <div className="flex items-center">
        <Image
          src={user}
          alt={`${userName} profile`}
          className="w-12 h-12 rounded-full object-cover"
          width={48}
          height={48}
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold">{userName}</h2>
          <p className="text-sm">Olá, bem-vindo!</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={onAddPet}
          className="w-10 h-10 rounded-full bg-purple-900 hover:bg-purple-800 flex items-center justify-center"
          title="Adicionar novo pet"
        >
          <span className="text-xl">+</span>
        </button>
        <button
          onClick={onLogout}
          className="w-10 h-10 rounded-full bg-purple-900 hover:bg-purple-800 flex items-center justify-center"
          title="Deslogar"
        >
          <span className="text-xl">🔓</span>
        </button>
      </div>
    </header>
  )
}

export default HeaderUser
