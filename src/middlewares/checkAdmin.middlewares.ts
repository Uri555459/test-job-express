import type { NextFunction, Response } from 'express'

import { Role } from '../../generated/prisma/enums'
import type { CustomRequest } from '../@types/request.interface'
import { MESSAGES_CONSTANTS, STATUS_CODE_CONSTANTS } from '../constants'

export function checkAdmin(
	req: CustomRequest,
	res: Response,
	next: NextFunction
) {
	const paramsId = +req.params.id

	if (req.user) {
		const { role, id: userId } = req.user

		if (role === Role.ADMIN && userId.toString() === paramsId.toString()) {
			return res
				.status(STATUS_CODE_CONSTANTS.conflict)
				.json({ messageError: MESSAGES_CONSTANTS.errorBlockAdmin })
		}

		next()
	}
}
