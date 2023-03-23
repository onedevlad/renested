import { IUseCase, PaginationData } from 'utils/types'
import { UserDto } from '../dto'
import { injectable } from 'inversify'
import { UserRepository } from 'modules/user/user.repository'

@injectable()
export class ListUsersUseCase implements IUseCase<PaginationData, UserDto[]> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(paginationData: PaginationData): Promise<UserDto[]> {
    return this.userRepository.listAll(paginationData)
  }
}
