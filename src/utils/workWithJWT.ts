import 'dotenv/config'
import jwt from 'jsonwebtoken'

import { Role } from '../../generated/prisma/enums'

interface IData {
	id: number
	role: Role
	userStatus: boolean
}

export const generateToken = (data: IData) => {
	return `Bearer ${jwt.sign({ ...data }, process.env.JWT_SECRET as string, {
		expiresIn: '1h'
	})}`
}
