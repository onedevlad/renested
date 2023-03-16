import { Container } from 'inversify'
import { AuthController } from 'controllers/auth'
import {
  ICreateUserRepository,
  CreateUserRepository,
} from 'repositories/CreateUser'
import { CreateUserValidationService } from 'services/validation/createUserValidation'
import { CreateUser } from 'useCases/auth/createUser'
import { TYPES } from 'config/types'

export const bootstrapIOC = () => {
  const container = new Container()
  container
    .bind<ICreateUserRepository>(TYPES.CreateUserRepository)
    .to(CreateUserRepository)
  container.bind<CreateUser>(TYPES.CreateUserUseCase).to(CreateUser)
  container
    .bind<CreateUserValidationService>(TYPES.CreateUserValidationService)
    .to(CreateUserValidationService)
  container.bind<AuthController>(TYPES.AuthController).to(AuthController)

  return container
}
