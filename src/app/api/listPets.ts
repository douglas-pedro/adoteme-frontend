import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  try {
    // Extrai os dados do corpo da requisição
    const { type, gender, age, special_condition, state, limit, cursor } =
      req.body

    // Monta o payload para o POST
    const bodyPayload = {
      type,
      gender,
      age,
      special_condition,
      state,
      limit: limit || 10, // Limite padrão de 10, se não fornecido
      cursor,
    }

    const apiUrl = 'http://localhost:4000/dev/get-pets'

    // Faz a chamada ao backend externo com o método POST
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Define o tipo do conteúdo como JSON
      },
      body: JSON.stringify(bodyPayload), // Envia o payload como JSON
    })

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ message: 'Failed to fetch pets from backend' })
    }

    const data = await response.json()

    // Retorna a resposta do backend ao cliente
    return res.status(200).json(data)
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Internal Server Error', details: error })
  }
}
