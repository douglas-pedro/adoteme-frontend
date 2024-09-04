import React, { useState } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (code: string) => void
}

export default function ModalConfirmeCode({
  isOpen,
  onClose,
  onConfirm,
}: ModalProps) {
  const [code, setCode] = useState<string[]>(Array(6).fill(''))

  if (!isOpen) return null

  const handleChange = (value: string, index: number) => {
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Move to the next input automatically if a value is entered
    if (value.length > 0 && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData('text').slice(0, 6)
    const newCode = pasteData.split('')
    setCode(newCode)

    newCode.forEach((char, index) => {
      const input = document.getElementById(`code-input-${index}`)
      if (input) {
        ;(input as HTMLInputElement).value = char
      }
    })
  }

  const handleConfirmClick = () => {
    const confirmationCode = code.join('')
    onConfirm(confirmationCode)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 p-6">
      <div className="bg-purple-700 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-md text-center font-semibold mb-4">
          Digite o código de validação que foi enviado para o seu e-mail:
        </h2>
        <div className="flex justify-between mb-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              id={`code-input-${index}`}
              key={index}
              type="text"
              maxLength={1}
              value={code[index]}
              onChange={(e) => handleChange(e.target.value, index)}
              onPaste={handlePaste}
              className="w-10 h-12 text-center text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-700 bg-purple-700"
            />
          ))}
        </div>
        <button
          onClick={handleConfirmClick}
          className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Confirmar Código
        </button>
        <button
          onClick={onClose}
          className="w-full mt-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}
