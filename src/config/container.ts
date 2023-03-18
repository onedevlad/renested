import { Container } from 'inversify'

import { AppDataSource } from 'frameworks/persistance/dataSource'
import { Logger } from 'services/logger'
import { UserRepository } from 'repositories/user.repository'
import { CreateUserUseCase } from 'use-cases/auth/create-user.use-case'

export class AppContainer {
  static init(container: Container) {
    container.bind(AppDataSource).toSelf()
    container.bind(Logger).toSelf()
    container.bind(UserRepository).toSelf()
    container.bind(CreateUserUseCase).toSelf()
  }
}
