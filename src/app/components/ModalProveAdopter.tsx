'use client'

import React from 'react'
import { useAlert } from '../context/AlertContext'

interface ModalAdoptionProps {
  requestId: number
  ownerId: string
  isOpen: boolean
  onClose: () => void
  onAdoptionSuccess: () => void
}

const ModalApproveAdoption: React.FC<ModalAdoptionProps> = ({
  requestId,
  ownerId,
  isOpen,
  onClose,
  onAdoptionSuccess,
}) => {
  const { showAlert } = useAlert()

  console.log(requestId, ownerId)

  const handleAdopt = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/dev/adoption-requests/${requestId}/approve `,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ownerId }),
        },
      )

      if (!response.ok) {
        throw new Error('Erro ao realizar adoção')
      }

      const data = await response.json()
      console.log('Resposta da adoção:', data)

      // Exibe o alerta de sucesso
      showAlert('success', 'Adoção aprovada com sucesso!')
      onAdoptionSuccess()
      onClose()
    } catch (error) {
      console.error('Erro ao adotar:', error)

      // Exibe o alerta de erro
      showAlert('error', 'Erro ao aprovar adoção. Por favor, tente novamente.')
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden m-4">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-title"
              >
                Confirmar Adoção
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Tem certeja que deseja aprovar a adoção deste pet para este
                  adotante ?
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            onClick={handleAdopt}
            className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
          >
            Aprovar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalApproveAdoption
