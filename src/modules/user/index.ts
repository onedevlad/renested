import { interfaces } from 'inversify'
import { UserRepository } from './user.repository'

export * from './dto'
export { UserRepository } from './user.repository'
export { User as UserEntity } from './user.entity'

export const modules: interfaces.ServiceIdentifier[] = [
  UserRepository,
]
