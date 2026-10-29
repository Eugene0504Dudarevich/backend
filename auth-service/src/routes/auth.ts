import { Router } from 'express'
import { login, register } from '../controllers'
import { validateRequest } from '../middlewares'
import { loginValidators, registerValidators } from '../utils'

const router = Router()

router.post('/register', registerValidators, validateRequest, register)
router.post('/login', loginValidators, validateRequest, login)

export default router
