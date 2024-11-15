'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import Alert from '../components/Alert'

type AlertContextType = {
  showAlert: (type: 'success' | 'error', message: string) => void
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

export const AlertProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [alert, setAlert] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ type, message })
    setIsVisible(true)

    // Define um timeout para ocultar o alerta após 5 segundos
    setTimeout(() => {
      setIsVisible(false)
    }, 5000)
  }

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {isVisible && alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setIsVisible(false)}
        />
      )}
    </AlertContext.Provider>
  )
}

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error('useAlert deve ser usado dentro de um AlertProvider')
  }
  return context
}
