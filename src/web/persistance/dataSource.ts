import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm'
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
export class AppDataSource {
  private _dataSource: DataSource
  private logger: Logger['logger']

  constructor(logger: Logger) {
    this.logger = logger.logger
  }

  async init(connectionOptions: IDbConnectionOptions) {
    const dataSource = new DataSource({
      type: 'postgres',
      synchronize: true,
      entities: [entitiesPath],
      entityPrefix: 'app_',
      ...connectionOptions,
    })

    try {
      this._dataSource = await dataSource.initialize()
      this.logger.info('Data Source has been initialized!')
    } catch (e) {
      this.logger.error('Error during Data Source initialization', e)
      throw e
    }
  }

  get dataSource() {
    return this._dataSource
  }

  public getRepository<
    Entity extends ObjectLiteral,
    Target extends EntityTarget<Entity>
  >(target: Target) {
    return this._dataSource.getRepository(target)
  }
}
