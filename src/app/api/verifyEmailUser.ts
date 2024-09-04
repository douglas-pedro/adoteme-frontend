export interface VerifyEmailPayload {
  email: string
}

export const verifyEmailUser = async (data: VerifyEmailPayload) => {
  try {
    const response = await fetch(
      `http://localhost:4000/dev/verify-email-user`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    )

    if (!response.ok) {
      throw new Error('Failed to verify email')
    }

    return await response.json()
  } catch (error) {
    console.error('Error verifying email:', error)
    throw error
  }
}
