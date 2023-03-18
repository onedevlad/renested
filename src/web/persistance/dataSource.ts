import { DataSource } from "typeorm"
import { injectable } from "inversify"
import { Logger } from "services/logger"

interface IDbConnectionOptions {
  host: string
  port: number
  username: string
  password: string
  database: string
}

@injectable()
export class AppDataSource {
  public dataSource: DataSource

  constructor(private readonly logger: Logger) {}

  async init(connectionOptions: IDbConnectionOptions) {
    const dataSource = new DataSource({
      type: "postgres",
      synchronize: true,
      entities: ["src/repositories/entities/*.ts"],
      entityPrefix: 'app_',
      ...connectionOptions
    })

    try {
      this.dataSource = await dataSource.initialize()
      this.logger.logger.info("Data Source has been initialized!")
    } catch(e) {
      this.logger.logger.error("Error during Data Source initialization", e)
      throw e
    }
  }
}
