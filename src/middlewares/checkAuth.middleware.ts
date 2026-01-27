import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'

import type { CustomRequest, IUserToHeaders } from '../@types/request.interface'
import { MESSAGES_CONSTANTS, STATUS_CODE_CONSTANTS } from '../constants'

export function checkAuthMiddleware(
	req: CustomRequest,
	res: Response,
	next: NextFunction
) {
	if (!req.headers.authorization) {
		return res
			.status(STATUS_CODE_CONSTANTS.forbidden)
			.json({ messageError: MESSAGES_CONSTANTS.errorForbidden })
	}

	try {
		const token = req.headers.authorization.split(' ')[1]

		if (!token) {
			return res
				.status(STATUS_CODE_CONSTANTS.forbidden)
				.json({ errorMessage: MESSAGES_CONSTANTS.errorForbidden })
		}

		if (token) {
			jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
				if (err) {
					return res
						.status(STATUS_CODE_CONSTANTS.forbidden)
						.json({ messageError: MESSAGES_CONSTANTS.errorDecodeJwt })
				}

				req.user = decoded as IUserToHeaders
				next()
			})
		}
	} catch (error) {
		console.error(error)
		return res
			.status(STATUS_CODE_CONSTANTS.forbidden)
			.json({ messageError: MESSAGES_CONSTANTS.errorForbidden })
	}
}
