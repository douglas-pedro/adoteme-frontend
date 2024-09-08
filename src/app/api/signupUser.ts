export const logout = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
      throw new Error('No access token found')
    }

    const response = await fetch(`http://localhost:4000/dev/logout `, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: accessToken,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to logout')
    }

    localStorage.removeItem('accessToken')

    return await response.json()
  } catch (error) {
    console.error('Error logging out:', error)
    throw error
  }
}
