'use client'

import React, { useState } from 'react'

type ButtonProps = {
  variant?: string
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
  disabled?: boolean
  title: string
}

const sizeClasses = {
  small: 'px-3 py-1 text-sm',
  medium: 'px-4 py-2 text-base',
  large: 'px-5 py-3 text-lg',
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  title,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    if (onClick) {
      setIsLoading(true)
      try {
        await onClick()
      } finally {
        setIsLoading(false)
      }
    }
  }

  const baseClasses =
    'rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
  const variantClass = variant
  const sizeClass = sizeClasses[size]
  const disabledClass =
    disabled || isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${disabledClass}`}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <div className="loader"></div> // Substitua pelo seu spinner de loading
      ) : (
        title
      )}
    </button>
  )
}

export default Button
