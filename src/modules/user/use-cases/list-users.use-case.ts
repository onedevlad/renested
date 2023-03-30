import { injectable } from 'inversify'

import { IUseCase, PaginationData } from 'utils/types'
import { UserRepository } from 'modules/user/user.repository'

import { UserDto } from '../dto'

@injectable()
export class ListUsersUseCase implements IUseCase<PaginationData, UserDto[]> {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(paginationData: PaginationData): Promise<UserDto[]> {
    return this.userRepository.listAll(paginationData)
  }
}
