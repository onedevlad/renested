import { Container } from 'inversify'

import { AppDataSource } from 'web/persistance/dataSource'
import { Logger } from 'services/logger'
import { UserRepository } from 'repositories/user.repository'
import { AuthService } from 'services/auth/auth.service'
import { PasswordService } from 'services/password/password.service'
import { RegisterUserUseCase } from 'use-cases/auth/register-user.use-case'
import { LoginUseCase } from 'use-cases/auth/login.use-case'

export class AppContainer {
  static init(container: Container) {
    container.bind(AppDataSource).toSelf()
    container.bind(Logger).toSelf()
    container.bind(UserRepository).toSelf()
    container.bind(AuthService).toSelf()
    container.bind(PasswordService).toSelf()
    container.bind(RegisterUserUseCase).toSelf()
    container.bind(LoginUseCase).toSelf()
  }
}
