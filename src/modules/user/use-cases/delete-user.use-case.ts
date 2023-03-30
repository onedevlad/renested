import { injectable } from 'inversify'

import { IUseCase } from 'utils/types'
import { DeleteUserDto } from 'modules/user/dto'
import { UnauthorizedException } from 'exceptions/unauthorized.exception'
import { UserRepository } from 'modules/user/user.repository'

@injectable()
export class DeleteUserUseCase implements IUseCase<DeleteUserDto, void> {
  constructor(private readonly userRespository: UserRepository) { }

  async execute(req: DeleteUserDto): Promise<void> {
    if (req.id !== req.myUserId) throw new UnauthorizedException()

    return this.userRespository.deleteUser(req.id)
  }
}
