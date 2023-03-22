import { interfaces } from 'inversify'
import { UserRepository } from './user.repository'
import { UserService } from './user.service'
import { ListUsersUseCase } from './use-cases/list-users.use-case'
import { DeleteUserUseCase } from './use-cases/delete-user.use-case'

export * from './dto'
export { User as UserEntity } from './user.entity'

export const modules: interfaces.ServiceIdentifier[] = [
  UserRepository,
  UserService,
  ListUsersUseCase,
  DeleteUserUseCase,
]
