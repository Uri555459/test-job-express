import type { Request } from 'express'

import { Role } from '../../generated/prisma/enums'

export interface IUserToHeaders {
	id: string
	role?: Role
	userStatus: boolean
}

export interface CustomRequest extends Request {
	user?: IUserToHeaders
}
