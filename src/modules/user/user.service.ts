import { injectable } from 'inversify'
import { UserRepository } from './user.repository'
import { PaginationData } from 'utils/types'

@injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  async listAllUsers(paginationData: PaginationData) {
    return this.userRepository.listAll(paginationData)
  }

  async deleteUser(id: number) {
    return this.userRepository.deleteUser(id)
  }
}
