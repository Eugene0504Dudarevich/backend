import { Request, Response } from 'express'
import { loginUser, registerUser } from '../services'

export const register = async (request: Request, response: Response) => {
  try {
    const { fullName, email, phoneNumber, password } = request.body

    const user = await registerUser(fullName, email, password, phoneNumber)

    response.status(201).json({
      message: 'User registered successfully',
      userId: user.id
    })
  } catch (error) {
    response.status(400).json({ error: (error as Error).message })
  }
}

export const login = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body

    const { accessToken, refreshToken } = await loginUser(email, password)
    response.status(200).json({
      message: 'User logged in successfully',
      accessToken: accessToken,
      refreshToken: refreshToken
    })
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'field' in error && 'message' in error) {
      return response.status(400).json(error)
    }

    return response.status(500).json({ message: 'Internal server error' })
  }
}
