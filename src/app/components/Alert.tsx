import React, { useEffect, useState } from 'react'

type AlertProps = {
  type: 'success' | 'error'
  message: string
  onClose?: () => void
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false)
      if (onClose) onClose()
    }, 4000)

    return () => clearTimeout(timeout)
  }, [onClose])

  if (!isVisible) return null

  return (
    <div
      className={`fixed top-5 right-5 max-w-xs p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
      } ${
        type === 'success'
          ? 'bg-green-500 text-white border-green-800'
          : 'bg-red-500 text-white border-red-800'
      }`}
    >
      <p className="text-sm font-bold">{message}</p>
    </div>
  )
}

export default Alert
