import type { Response } from 'express'

import { Role } from '../../generated/prisma/enums'
import { prismaClient } from '../../prisma'
import { CustomRequest } from '../@types/request.interface'
import { MESSAGES_CONSTANTS, STATUS_CODE_CONSTANTS } from '../constants'

class UserController {
	async getOne(req: CustomRequest, res: Response) {
		const paramsId = +req.params.id

		try {
			const user = await prismaClient.user.findUnique({
				where: { id: paramsId },
				omit: { password: true }
			})

			if (!user) {
				return res
					.status(STATUS_CODE_CONSTANTS.notFound)
					.json({ messageError: MESSAGES_CONSTANTS.errorNotFoundUser })
			}

			res
				.status(STATUS_CODE_CONSTANTS.ok)
				.json({ user, messageSuccess: MESSAGES_CONSTANTS.successGetOneUser })
		} catch (error) {
			console.error(error)
			return res
				.status(STATUS_CODE_CONSTANTS.errorServer)
				.json({ messageError: MESSAGES_CONSTANTS.errorServer })
		}
	}

	async getAll(req: CustomRequest, res: Response) {
		if (req.user) {
			const { role } = req.user

			if (role !== Role.ADMIN) {
				return res
					.status(STATUS_CODE_CONSTANTS.forbidden)
					.json({ messageError: MESSAGES_CONSTANTS.errorForbidden })
			}
		}

		try {
			const users = await prismaClient.user.findMany({
				omit: {
					password: true
				}
			})

			if (users.length === 0) {
				return res
					.status(STATUS_CODE_CONSTANTS.notFound)
					.json({ messageError: MESSAGES_CONSTANTS.errorNotFoundUser })
			}

			return res
				.status(STATUS_CODE_CONSTANTS.ok)
				.json({ users, messageSuccess: MESSAGES_CONSTANTS.successGetAllUsers })
		} catch (error) {
			console.error(error)
			return res
				.status(STATUS_CODE_CONSTANTS.errorServer)
				.json({ messageError: MESSAGES_CONSTANTS.errorServer })
		}
	}

	async blockUser(req: CustomRequest, res: Response) {
		const paramsId = +req.params.id

		try {
			const user = await prismaClient.user.updateMany({
				where: { id: paramsId },
				data: { userStatus: false }
			})

			if (user.count === 0) {
				return res
					.status(STATUS_CODE_CONSTANTS.notFound)
					.json({ messageError: MESSAGES_CONSTANTS.errorNotFoundUser })
			}

			return res.status(STATUS_CODE_CONSTANTS.ok).json({
				user,
				messageSuccess: `${MESSAGES_CONSTANTS.successBlockUser} userId: ${paramsId}`
			})
		} catch (error) {
			console.error(error)
			return res
				.status(STATUS_CODE_CONSTANTS.errorServer)
				.json({ messageError: MESSAGES_CONSTANTS.errorServer })
		}
	}

	async unlockUser(req: CustomRequest, res: Response) {
		const paramsId = +req.params.id

		try {
			const user = await prismaClient.user.updateMany({
				where: { id: paramsId },
				data: { userStatus: true }
			})

			if (user.count === 0) {
				return res
					.status(STATUS_CODE_CONSTANTS.notFound)
					.json({ messageError: MESSAGES_CONSTANTS.errorNotFoundUser })
			}

			res.status(STATUS_CODE_CONSTANTS.ok).json({
				user,
				messageSuccess: `${MESSAGES_CONSTANTS.successUnlockUser} userId: ${paramsId}`
			})
		} catch (error) {
			console.error(error)
			return res
				.status(STATUS_CODE_CONSTANTS.errorServer)
				.json({ messageError: MESSAGES_CONSTANTS.errorServer })
		}
	}
}

export const userController = new UserController()
