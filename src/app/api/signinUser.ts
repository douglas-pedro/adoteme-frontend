export interface SignInPayload {
  username: string
  password: string
}

export const signIn = async (data: SignInPayload) => {
  try {
    const response = await fetch(`http://localhost:4000/dev/sign-in-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to sign in')
    }

    const responseData = await response.json()

    localStorage.setItem('accessToken', responseData.accessToken)

    return responseData
  } catch (error) {
    console.error('Error signing in:', error)
    throw error
  }
}
