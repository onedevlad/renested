import { CreateUserDto } from 'modules/auth/dto'
import { UserDto } from 'modules/user'
import { UserAlreadyExistsException } from 'exceptions/user-already-exists.exception'
import { injectable } from 'inversify'
import { AuthService } from 'modules/auth/auth.service'
import { IUseCase } from 'utils/types'

@injectable()
export class RegisterUserUseCase implements IUseCase<CreateUserDto, UserDto> {
  constructor(
    private readonly authService: AuthService,
  ) {}

  async execute(createUserDto: CreateUserDto) {
    const existingUser = await this.authService.findUserByEmail(createUserDto.email)
    if (existingUser) throw new UserAlreadyExistsException()

    return this.authService.createUser(createUserDto)
  }
}
