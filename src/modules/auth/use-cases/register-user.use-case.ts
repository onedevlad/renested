import { AuthTokenDto, CreateUserDto } from 'modules/auth/dto'
import { UserAlreadyExistsException } from 'modules/auth/exceptions/user-already-exists.exception'
import { injectable } from 'inversify'
import { AuthService } from 'modules/auth/auth.service'
import { IUseCase } from 'utils/types'

@injectable()
export class RegisterUserUseCase implements IUseCase<CreateUserDto, AuthTokenDto> {
  constructor(
    private readonly authService: AuthService,
  ) {}

  async execute(createUserDto: CreateUserDto) {
    const existingUser = await this.authService.findUserByEmail(createUserDto.email)
    if (existingUser) throw new UserAlreadyExistsException()

    const newUser = await this.authService.createUser(createUserDto)

    return this.authService.makeToken(newUser)
  }
}
