import { NextFunction, Router, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { login, register } from '../controllers'
import { registerValidators } from '../utils'

const router = Router()

const handleValidationErrors = (request: Request, response: Response, next: NextFunction) => {
  const errors = validationResult(request)

  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() })
  }

  next()
}

router.post('/register', registerValidators, handleValidationErrors, register)
router.post('/login', login)

export default router
