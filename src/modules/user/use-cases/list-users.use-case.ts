import { IUseCase, PaginationData } from 'utils/types'
import { UserDto } from '../dto'
import { injectable } from 'inversify'
import { UserService } from 'modules/user/user.service'

@injectable()
export class ListUsersUseCase implements IUseCase<PaginationData, UserDto[]> {
  constructor(private readonly userService: UserService) {}

  async execute(paginationData: PaginationData): Promise<UserDto[]> {
    return this.userService.listAllUsers(paginationData)
  }
}
