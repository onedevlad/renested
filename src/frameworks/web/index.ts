import express from 'express'
import morgan from 'morgan'

import type { AuthController } from 'controllers/auth'
import type { AppDataSource } from 'frameworks/persistance/dataSource'
import { bootstrapIOC } from 'config/Inversify'
import { TYPES } from 'config/types'
import { logger } from 'services/logger'

const container = bootstrapIOC()

const app = express()
const router = express.Router()

export class ExpressBootstrap {
  static async start() {
    app.use(express.json())
    app.use(morgan('dev'))

    router.post('/api/v1/auth/register', (req, res) =>
      container
        .get<AuthController>(TYPES.AuthController)
        .register(req.body, res)
    )

    app.use(router)

    await container.get<AppDataSource>(TYPES.AppDataSource).init()

    app.listen(process.env.APP_PORT, () =>
      logger.info(`Listening on port ${process.env.APP_PORT}`)
    )
  }
}

ExpressBootstrap.start()
