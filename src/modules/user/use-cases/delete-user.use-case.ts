import { IUseCase } from 'utils/types'
import { DeleteUserDto } from 'modules/user/dto'
import { UserService } from '../user.service'
import { UnauthorizedException } from 'exceptions/unauthorized.exception'
import { injectable } from 'inversify'

@injectable()
export class DeleteUserUseCase implements IUseCase<DeleteUserDto, void> {
  constructor(private readonly userService: UserService) {}

  async execute(req: DeleteUserDto): Promise<void> {
    if (req.id !== req.myUserId) throw new UnauthorizedException()

    return this.userService.deleteUser(req.id)
  }
}
