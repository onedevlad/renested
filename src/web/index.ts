import morgan from 'morgan'
import { Container } from 'inversify'

import {
  Application,
  IAbstractApplicationOptions,
} from './lib/abstract-application'
import { AppDataSource } from './persistance/dataSource'
import { Logger } from 'services/logger'
import { AppContainer } from 'config/container'
import { setupServer } from './setupServer'

class App extends Application {
  constructor() {
    super({
      containerOptions: {
        /* defaultScope: 'Singleton', */
      },
      dbOptions: {
        host: process.env.POSTGRES_HOST ?? '',
        port: +(process.env.POSTGRES_PORT || 3000),
        username: process.env.POSTGRES_USER ?? '',
        password: process.env.POSTGRES_PASSWORD ?? '',
        database: process.env.POSTGRES_DB ?? '',
      },
      logging: {
        logLevel: process.env.LOG_LEVEL ?? '0',
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

    const app = setupServer({
      container: this.container,
      logger: logger.logger,
      setConfig: app => app.use(morgan('dev'))
    })

    app.listen(process.env.APP_PORT, () =>
      logger.logger.info(
        logger.box(`Listening on 0.0.0.0:${process.env.APP_PORT}`)
      )
    )
  }
}

new App()
