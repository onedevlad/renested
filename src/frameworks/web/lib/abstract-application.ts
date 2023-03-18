import { Container, interfaces } from "inversify"

export interface IAbstractApplicationOptions {
  containerOptions: interfaces.ContainerOptions
  dbOptions: {
    host: string
    port: number
    database: string
    username: string
    password: string
  }
  logging: {
    logLevel: string
  }
}

export abstract class Application {
  protected readonly container: Container

  constructor(options: IAbstractApplicationOptions) {
    this.container = new Container(options.containerOptions)

    this.configureServices(this.container)
    this.setup(options)
  }

  abstract configureServices(container: Container): void
  abstract setup(options: IAbstractApplicationOptions): Promise<void> | void
}
