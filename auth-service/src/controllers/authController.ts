import { Request, Response } from 'express'
import { loginUser, registerUser } from '../services'
import { CustomError } from '../types'

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
    const err = error as CustomError
    if (err.statusCode) {
      return response.status(err.statusCode).json({ message: err.message })
    }

    return response.status(500).json({ message: 'Internal server error' })
  }
}
