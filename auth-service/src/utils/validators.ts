import { body } from 'express-validator'

export const commonValidators = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
]

export const registerValidators = [
  body('fullName')
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 3 })
    .withMessage('Full name must be at least 3 characters'),
  body('phoneNumber').notEmpty().withMessage('Phone number is required'),
  ...commonValidators
]

export const loginValidators = [...commonValidators]
