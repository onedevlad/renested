import { ContainerModule } from 'inversify'

import { AuthController } from './auth.controller'
import { AuthRepository } from './auth.repository'
import { LoginUseCase } from './use-cases/login.use-case'
import { RegisterUserUseCase } from './use-cases/register-user.use-case'

export class AuthModule extends ContainerModule {
  public constructor() {
    super(bind => {
      bind(AuthController).toSelf()
      bind(AuthRepository).toSelf()
      bind(LoginUseCase).toSelf()
      bind(RegisterUserUseCase).toSelf()
    })
  }
}
