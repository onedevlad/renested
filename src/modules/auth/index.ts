import { interfaces } from 'inversify'

import { AuthRepository } from './auth.repository'
import { LoginUseCase } from './use-cases/login.use-case'
import { RegisterUserUseCase } from './use-cases/register-user.use-case'

export { AuthRepository } from './auth.repository'

export const modules: interfaces.ServiceIdentifier[] = [
  AuthRepository,
  LoginUseCase,
  RegisterUserUseCase,
]
