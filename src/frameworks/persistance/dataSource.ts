import { DataSource } from "typeorm"
import { injectable } from "inversify"
import { logger } from "services/logger"
import { User } from "repositories/UserEntity"

@injectable()
export class AppDataSource {
  dataSource: DataSource

  async init() {
    const dataSource = new DataSource({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      entities: [User],
      entityPrefix: 'app_',
    })

    try {
      this.dataSource = await dataSource.initialize()
      logger.info("Data Source has been initialized!")
    } catch(e) {
      logger.error("Error during Data Source initialization", e)
      throw e
    }
  }
}
