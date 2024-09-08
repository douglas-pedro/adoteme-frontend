// src/api/user.ts

export interface CreateUserPayload {
  username: string
  name: string
  password: string
  confirmPassword: string
  email: string
  phoneNumber: string
  cep: string
  address: string
  city: string
  complement: string
  district: string
  number: string
  phone: string
  responsibleName: string
  state: string
  type: string
  cnpj?: string
}

export const createUser = async (data: CreateUserPayload) => {
  try {
    const response = await fetch(`http://localhost:4000/dev/create-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to create user')
    }

    return await response.json()
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}
