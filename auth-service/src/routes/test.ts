import { Router } from 'express'
import { test } from '../controllers'
import { authenticate } from '../middlewares'

const router = Router()

router.get('/test', authenticate, test)

export default router
