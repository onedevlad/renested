import express from 'express'
import morgan from 'morgan'

import type { Container } from 'inversify'
import { InversifyExpressServer } from "inversify-express-utils"

import { Application, IAbstractApplicationOptions } from './lib/abstract-application'
import { ErrorHandlerMiddleware } from './middlewares/error-handler.middleware'
import { AppDataSource } from './persistance/dataSource'
import { Logger } from 'services/logger'
import { AppContainer } from 'config/container'

import "modules/auth/auth.controller"

class App extends Application {
  constructor() {
    super({
      containerOptions: {
        defaultScope: 'Singleton',
      },
      dbOptions: {
        host: process.env.POSTGRES_HOST,
        port: +process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
      },
      logging: {
        logLevel: process.env.LOG_LEVEL,
      },
    })
  }

  configureServices(container: Container) {
    AppContainer.init(container)
  }

  async setup(options: IAbstractApplicationOptions) {
    const logger = this.container.get(Logger)
    logger.init({ logLevel: options.logging.logLevel })

    const dataSource = this.container.get(AppDataSource)
    await dataSource.init(options.dbOptions)

    const server = new InversifyExpressServer(this.container)
    const errorHandlerMiddleware = new ErrorHandlerMiddleware(logger.logger)

    server.setErrorConfig(app => app.use(errorHandlerMiddleware.execute))

    server.setConfig(app => {
      app.use(express.json())
      app.use(morgan('dev'))
    })

    const app = server.build()

    app.listen(process.env.APP_PORT, () =>
      logger.logger.info(logger.box(`Listening on 0.0.0.0:${process.env.APP_PORT}`))
    )
  }
}

new App()
