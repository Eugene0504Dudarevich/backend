import { CustomError } from '../types'

export const createError = (statusCode: number, message: string): CustomError => {
  const error = new Error(message) as CustomError
  error.statusCode = statusCode

  return error
}
