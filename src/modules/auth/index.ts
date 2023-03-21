import { interfaces } from 'inversify'

import { AuthRepository } from './auth.repository'
import { AuthService } from './auth.service'
import { LoginUseCase } from './use-cases/login.use-case'
import { RegisterUserUseCase } from './use-cases/register-user.use-case'

export { AuthController } from './auth.controller'
export { AuthService } from './auth.service'
export { AuthRepository } from './auth.repository'

export const modules: interfaces.ServiceIdentifier[] = [
  AuthService,
  AuthRepository,
  LoginUseCase,
  RegisterUserUseCase,
]
