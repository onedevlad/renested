import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'

import { AuthController } from 'controllers/auth'
import { bootstrapIOC } from 'config/Inversify'
import { TYPES } from 'config/types'

dotenv.config()
const container = bootstrapIOC()

const app = express()
const router = express.Router()

export class ExpressBootstrap {
  static start() {
    app.use(express.json())
    app.use(morgan('dev'))

    router.post('/api/v1/auth/register', (req, res) =>
      container
        .get<AuthController>(TYPES.AuthController)
        .register(req.body, res)
    )

    app.use(router)

    app.listen(process.env.APP_PORT, () =>
      console.log(`Listening on port ${process.env.APP_PORT}`)
    )
  }
}

ExpressBootstrap.start()
