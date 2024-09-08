// src/api/pet.ts

export interface CreatePetPayload {
  name: string
  type: string
  gender: string
  age: number
  special_condition?: string
  idCognito: string
  address: {
    zipCode: string
    address: string
    number: string
    complement?: string
    district: string
    state: string
  }
  images: {
    fileName: string
    fileContent: string // Base64 string
    avatarPath?: boolean
  }[]
}

export const createPet = async (data: CreatePetPayload) => {
  try {
    const response = await fetch(`http://localhost:4000/dev/add-new-pet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to create pet')
    }

    return await response.json()
  } catch (error) {
    console.error('Error creating pet:', error)
    throw error
  }
}
