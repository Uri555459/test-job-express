import 'colors'
import type { NextFunction, Request, Response } from 'express'

import { MESSAGES_CONSTANTS, STATUS_CODE_CONSTANTS } from '../constants'

export const notFound = (req: Request, res: Response, next: NextFunction) => {
	const error = new Error(
		`${MESSAGES_CONSTANTS.errorNoteFoundRoute.white.bgRed.bold} - ${req.originalUrl}`
	)
	res.status(STATUS_CODE_CONSTANTS.notFound)
	next(error)
}

export const errorHandler = (
	err: TypeError,
	req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	next: NextFunction
) => {
	const statusCode =
		res.statusCode === STATUS_CODE_CONSTANTS.ok
			? STATUS_CODE_CONSTANTS.errorServer
			: res.statusCode
	res.status(statusCode)
	res.json({
		errorMessage: err.message,
		stack: process.env.NODE_ENV === 'production' ? null : err.stack
	})
}
