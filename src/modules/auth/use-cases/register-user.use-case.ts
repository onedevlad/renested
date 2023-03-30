import { injectable } from 'inversify'

import { AuthTokenDto, CreateUserDto } from 'modules/auth/dto'
import { UserAlreadyExistsException } from 'modules/auth/exceptions/user-already-exists.exception'
import { IUseCase } from 'utils/types'
import { PasswordService } from 'services/password/password.service'
import { TokenService } from 'services/token/token.service'
import { UserEntity } from 'modules/user/user.entity'

import { AuthRepository } from '../auth.repository'

@injectable()
export class RegisterUserUseCase
  implements IUseCase<CreateUserDto, AuthTokenDto>
{
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService
  ) { }

  private async createUser(createUserDto: CreateUserDto) {
    const passwordHash = await this.passwordService.hash(createUserDto.password)
    const newUserDto: CreateUserDto = {
      ...createUserDto,
      password: passwordHash,
    }

    return this.authRepository.create(newUserDto)
  }

  private createToken(user: UserEntity) {
    return new AuthTokenDto(this.tokenService.createToken(user))
  }

  async execute(createUserDto: CreateUserDto) {
    const existingUser = await this.authRepository.findByEmail(
      createUserDto.email
    )
    if (existingUser) throw new UserAlreadyExistsException()

    const newUser = await this.createUser(createUserDto)
    return this.createToken(newUser)
  }
}
