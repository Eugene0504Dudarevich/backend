import { NextFunction, Request, Response } from 'express'
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'

type AuthenticatedRequest = Request & {
  user?: { userId: string }
}

const JWT_ACCESS_SECRET = process.env.JWT_ACESS_SECRET || 'access_secret'

export const authenticate = (request: AuthenticatedRequest, response: Response) => {
  const authHeader = request.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return response.status(401).json({ message: 'Missing or invalid token' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decodedToken = jwt.verify(token, JWT_ACCESS_SECRET) as { userId: string }
    request.user = { userId: decodedToken.userId }
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return response.status(403).json({ message: 'Access token expired' })
    }
    if (error instanceof JsonWebTokenError) {
      return response.status(401).json({ message: 'Invalid token' })
    }

    return response.status(500).json({ message: 'Internal server error' })
  }
}
