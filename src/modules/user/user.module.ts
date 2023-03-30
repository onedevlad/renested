import { ContainerModule } from 'inversify'

import { UserController } from './user.controller'
import { UserRepository } from './user.repository'
import { ListUsersUseCase } from './use-cases/list-users.use-case'
import { DeleteUserUseCase } from './use-cases/delete-user.use-case'

export class UserModule extends ContainerModule {
  public constructor() {
    super(bind => {
      bind(UserController).toSelf()
      bind(UserRepository).toSelf()
      bind(DeleteUserUseCase).toSelf()
      bind(ListUsersUseCase).toSelf()
    })
  }
}
