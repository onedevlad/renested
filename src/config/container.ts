import { Container } from 'inversify'

import { AppDataSource } from 'web/persistance/dataSource'
import { Logger } from 'services/logger'
import { UserRepository } from 'repositories/user.repository'
import { UserService } from 'services/user/user.service'

export class AppContainer {
  static init(container: Container) {
    container.bind(AppDataSource).toSelf()
    container.bind(Logger).toSelf()
    container.bind(UserRepository).toSelf()
    container.bind(UserService).toSelf()
  }
}
