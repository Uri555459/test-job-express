import bcrypt from 'bcrypt'
import 'dotenv/config'
import type { Request, Response } from 'express'
import { validationResult } from 'express-validator'

import type { User } from '../../generated/prisma/client'
import { prismaClient } from '../../prisma'
import { MESSAGES_CONSTANTS, STATUS_CODE_CONSTANTS } from '../constants'
import { generateToken } from '../utils'

class AuthController {
	async register(req: Request, res: Response) {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(STATUS_CODE_CONSTANTS.badRequest).json({
					errorMessage: MESSAGES_CONSTANTS.errorRegisterUser,
					errors
				})
			}

			const candidate = await prismaClient.user.findUnique({
				where: { email: req.body.email }
			})

			if (candidate) {
				return res
					.status(STATUS_CODE_CONSTANTS.conflict)
					.json({ errorMessage: MESSAGES_CONSTANTS.errorEmail })
			}

			const { password, name, bio, email, userStatus, dateOfBirth, role } =
				req.body as User

			const userData = {
				name,
				bio,
				dateOfBirth,
				email,
				userStatus,
				role
			}

			const saltRounds = 10
			const salt = bcrypt.genSaltSync(saltRounds)
			const passwordHash = bcrypt.hashSync(password, salt)

			const user = await prismaClient.user.create({
				data: {
					...userData,
					password: passwordHash
				}
			})

			const token = generateToken({
				id: user.id,
				role: user.role,
				userStatus: user.userStatus
			})

			return res.status(STATUS_CODE_CONSTANTS.create).json({
				token: token,
				messageSuccess: MESSAGES_CONSTANTS.successRegisterUser
			})
		} catch (error) {
			console.log(error, MESSAGES_CONSTANTS.errorRegisterUser.white.bgRed.bold)
			return res
				.status(STATUS_CODE_CONSTANTS.errorServer)
				.json({ messageError: MESSAGES_CONSTANTS.errorServer })
		}
	}

	async login(req: Request, res: Response) {
		const { email, password } = req.body

		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				return res.status(STATUS_CODE_CONSTANTS.badRequest).json({
					errorMessage: MESSAGES_CONSTANTS.errorRegisterUser,
					errors
				})
			}

			const candidate = await prismaClient.user.findUnique({
				where: { email }
			})

			if (!candidate) {
				return res
					.status(STATUS_CODE_CONSTANTS.forbidden)
					.json({ errorMessage: MESSAGES_CONSTANTS.errorEmailOrPassword })
			}

			const { password: hashPassword } = candidate

			const checkPassword = bcrypt.compareSync(password, hashPassword)

			if (!checkPassword) {
				return res
					.status(STATUS_CODE_CONSTANTS.forbidden)
					.json({ errorMessage: MESSAGES_CONSTANTS.errorEmailOrPassword })
			}

			const { id, role, userStatus } = candidate

			const token = generateToken({ id, role, userStatus })

			return res.json({
				token,
				messageSuccess: MESSAGES_CONSTANTS.successLogin
			})
		} catch (error) {
			console.error(error, MESSAGES_CONSTANTS.errorAuth.white.bgRed.bold)
			return res
				.status(STATUS_CODE_CONSTANTS.errorServer)
				.json({ messageError: MESSAGES_CONSTANTS.errorServer })
		}
	}
}

export const authController = new AuthController()
