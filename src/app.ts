import 'colors'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'

import { MESSAGES_CONSTANTS } from './constants'
import { checkAuthMiddleware, errorHandler, notFound } from './middlewares'
import { authRouter, userRouter } from './routes'

const start = async () => {
	const PORT = process.env.PORT
	const HOST_NAME = process.env.HOST_NAME
	const MODE = process.env.NODE_ENV || 'development'
	const PREFIX = '/api'

	const app = express()

	app.disable('x-powered-by')
	app.use(cors())
	app.use(express.urlencoded({ extended: true }))
	app.use(express.json())
	MODE === 'development' && app.use(morgan('dev'))

	app.use(PREFIX, authRouter)

	app.use(PREFIX, checkAuthMiddleware, userRouter)

	app.use(notFound)
	app.use(errorHandler)

	app.listen(PORT, () =>
		console.log(
			`${MESSAGES_CONSTANTS.successServerStarted} ${HOST_NAME}:${PORT}`.white
				.bgGreen.bold
		)
	)
}

start()
