import { Container, interfaces } from 'inversify'

import { Logger } from 'services/logger'
import { AppDataSource } from 'web/persistance/dataSource'
import { TokenService } from 'services/token/token.service'
import { PasswordService } from 'services/password/password.service'

import { AuthModule } from 'modules/auth/auth.module'
import { UserModule } from 'modules/user/user.module'
import { AuthMiddleware } from 'web/middlewares/auth.middleware'
import { PaginationMiddleware } from 'web/middlewares/pagination.middleware'

const makeBind =
  (container: Container) =>
    <T>(module: interfaces.ServiceIdentifier<T>) =>
      container.bind(module).toSelf().inSingletonScope()

export class AppContainer {
  static init(container: Container) {
    const bind = makeBind(container)

    const sharedModules: interfaces.ServiceIdentifier[] = [
      Logger,
      AppDataSource,
      AuthMiddleware,
      PaginationMiddleware,
      TokenService,
      PasswordService,
    ]

    sharedModules.forEach(bind)

    container.load(new AuthModule())
    container.load(new UserModule())
  }
}
