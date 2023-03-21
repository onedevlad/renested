import { injectable } from 'inversify'

import { UserEntity } from 'modules/user'
import { PasswordService } from 'services/password/password.service'
import { AuthTokenDto, CreateUserDto } from './dto'
import { AuthRepository } from './auth.repository'
import { TokenService } from 'services/token/token.service'

@injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService
  ) { }

  async findUserByEmail(email: string) {
    return this.authRepository.findByEmail(email)
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const passwordHash = await this.passwordService.hash(createUserDto.password)
    const newUserDto: CreateUserDto = Object.assign(
      new CreateUserDto(),
      createUserDto,
      { password: passwordHash }
    )

    return this.authRepository.create(newUserDto)
  }

  async checkPassword(password: string, hash: string) {
    return this.passwordService.compare(password, hash)
  }

  async makeToken(user: UserEntity) {
    const token = this.tokenService.createToken(user)
    return new AuthTokenDto(token)
  }
}
