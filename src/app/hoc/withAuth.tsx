'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const withAuth = (WrappedComponent: React.ComponentType) => {
  const Wrapper = (props: any) => {
    const router = useRouter()

    useEffect(() => {
      const token = localStorage.getItem('accessToken')

      if (!token) {
        router.push('/signin')
      }
    }, [router])

    return localStorage.getItem('accessToken') ? (
      <WrappedComponent {...props} />
    ) : null
  }

  return Wrapper
}

export default withAuth
