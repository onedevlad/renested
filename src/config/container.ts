import { Container, interfaces } from 'inversify'

import { AuthModule } from 'modules/auth/auth.module'
import { UserModule } from 'modules/user/user.module'

import { sharedModules } from './shared-modules'

const makeBind =
  (container: Container) =>
    <T>(module: interfaces.ServiceIdentifier<T>) =>
      container.bind(module).toSelf().inSingletonScope()

export class AppContainer {
  static init(container: Container) {
    const bind = makeBind(container)

    sharedModules.forEach(bind)

    container.load(new AuthModule())
    container.load(new UserModule())
  }
}
