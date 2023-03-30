import {
  DataSource as RootDataSource,
  EntityTarget,
  ObjectLiteral,
} from 'typeorm'
import { injectable } from 'inversify'

import { Logger } from 'services/logger'
import { entitiesPath } from './entities'

interface IDbConnectionOptions {
  host: string
  port: number
  username: string
  password: string
  database: string
}

@injectable()
export class DataSource {
  public dataSource: RootDataSource

  constructor(private logger: Logger) { }

  async init(connectionOptions: IDbConnectionOptions) {
    const dataSource = new RootDataSource({
      type: 'postgres',
      synchronize: true,
      entities: [entitiesPath],
      entityPrefix: 'app_',
      ...connectionOptions,
    })

    try {
      this.dataSource = await dataSource.initialize()
      this.logger.info('Data Source has been initialized!')
    } catch (e) {
      this.logger.error('Error during Data Source initialization', e)
      throw e
    }
  }

  public getRepository<
    Entity extends ObjectLiteral,
    Target extends EntityTarget<Entity>
  >(target: Target) {
    return this.dataSource.getRepository(target)
  }
}
