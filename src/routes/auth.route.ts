import { Router } from 'express'
import { check } from 'express-validator'

import { authController } from '../controllers'

export const authRouter = Router()

const registerFields = [
	check('name', 'Имя пользователя не может быть пустым').trim().notEmpty(),
	check('bio', 'Поле bio не может быть пустым').trim().notEmpty(),
	check('dateOfBirth', 'Поле дата рождения, не может быть пустым')
		.trim()
		.notEmpty(),
	check('email', 'Введите корректный Email').trim().notEmpty().isEmail(),
	check(
		'password',
		'Пароль должен содержать не менее 8 символов, и не более 25-ти'
	).isLength({
		min: 8,
		max: 25
	}),
	check('userStatus').optional().isBoolean()
]

const loginFields = [
	check('email', 'Введите корректный Email').trim().notEmpty().isEmail(),
	check(
		'password',
		'Пароль должен содержать не менее 8 символов, и не более 25-ти'
	).isLength({
		min: 8,
		max: 25
	})
]

authRouter.post('/auth/register', registerFields, authController.register)
authRouter.post('/auth/login', loginFields, authController.login)
