import { Container, interfaces } from 'inversify'

import { Logger } from 'services/logger'
import { AppDataSource } from 'web/persistance/dataSource'
import { TokenService } from 'services/token/token.service'
import { PasswordService } from 'services/password/password.service'

import { modules as authModules } from 'modules/auth'
import { modules as userModules } from 'modules/user'

const makeBind =
  (container: Container) =>
    <T>(module: interfaces.ServiceIdentifier<T>) =>
      container.bind(module).toSelf()

export class AppContainer {
  static init(container: Container) {
    const bind = makeBind(container)

    bind(Logger)
    bind(AppDataSource)
    bind(TokenService)
    bind(PasswordService)

    ;[authModules, userModules].flat().forEach(bind)
  }
}
