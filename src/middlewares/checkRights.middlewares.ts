import type { NextFunction, Response } from 'express'

import { Role } from '../../generated/prisma/enums'
import { CustomRequest } from '../@types/request.interface'
import { MESSAGES_CONSTANTS, STATUS_CODE_CONSTANTS } from '../constants'

export function checkRights(
	req: CustomRequest,
	res: Response,
	next: NextFunction
) {
	const paramsId = req.params.id

	if (req.user) {
		const { role, id: userId } = req.user

		if (role !== Role.ADMIN && userId.toString() !== paramsId.toString()) {
			return res
				.status(STATUS_CODE_CONSTANTS.forbidden)
				.json({ messageError: MESSAGES_CONSTANTS.errorForbidden })
		}
		next()
	}
}
