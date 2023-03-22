import { Container, interfaces } from 'inversify'

import { Logger } from 'services/logger'
import { AppDataSource } from 'web/persistance/dataSource'
import { TokenService } from 'services/token/token.service'
import { PasswordService } from 'services/password/password.service'

import { modules as authModules } from 'modules/auth'
import { modules as userModules } from 'modules/user'
import { AuthMiddleware } from 'web/middlewares/auth.middleware'

const makeBind =
  (container: Container) =>
    <T>(module: interfaces.ServiceIdentifier<T>) =>
      container.bind(module).toSelf().inSingletonScope()

export class AppContainer {
  static init(container: Container) {
    const bind = makeBind(container)

    const sharedModules = [
      Logger,
      AppDataSource,
      AuthMiddleware,
      TokenService,
      PasswordService,
    ]

    const modules = [sharedModules, authModules, userModules]

    modules.flat().forEach(bind)
  }
}
