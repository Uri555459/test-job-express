import { Router } from 'express'

import { userController } from '../controllers'
import { checkAdmin, checkRights } from '../middlewares'

export const userRouter = Router()

userRouter.get('/users/:id', checkRights, userController.getOne)

userRouter.get('/users', userController.getAll)

userRouter.patch(
	'/users/block/:id',
	checkAdmin,
	checkRights,
	userController.blockUser
)

userRouter.patch(
	'/users/unlock/:id',
	checkAdmin,
	checkRights,

	userController.unlockUser
)
