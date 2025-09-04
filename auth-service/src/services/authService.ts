import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../db'
import { createError } from '../utils'

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret'

export const registerUser = async (
  fullName: string,
  email: string,
  password: string,
  phoneNumber: string
) => {
  const existingUser = await prisma.user.findUnique({ where: { email } })

  if (existingUser) throw new Error('User with this email already exist')

  const hashedPassword = await bcrypt.hash(password, 10)

  return await prisma.user.create({
    data: {
      full_name: fullName,
      email,
      phone_number: phoneNumber,
      password: hashedPassword
    }
  })
}

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) throw createError(401, 'Invalid credentials')
  const isPasswordMatch = await bcrypt.compare(password, user.password)

  if (!isPasswordMatch) throw createError(401, 'Invalid credentials')

  const accessToken = jwt.sign({ userId: user.id }, JWT_ACCESS_SECRET, { expiresIn: '15m' })
  const refreshToken = jwt.sign({ userId: user.id }, JWT_REFRESH_SECRET, { expiresIn: '7d' })

  return { accessToken, refreshToken }
}
