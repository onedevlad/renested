import { injectable } from 'inversify'

import { CreateUserDto, UserDto } from 'dtos/index'
import { UserRepository } from 'repositories/user.repository'
import { PasswordService } from 'services/password/password.service'
import { AuthTokenDto } from 'dtos/auth/auth-token.dto'
import { User } from 'repositories/entities/user.entity'
import { TokenService } from 'services/token/token.service'

@injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
  ) { }

  async findUserByEmail(email: string) {
    return this.userRepository.findByEmail(email)
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const passwordHash = await this.passwordService.hash(createUserDto.password)
    const newUserDto = Object.assign(new CreateUserDto(), createUserDto, {
      password: passwordHash,
    })

    return this.userRepository.create(newUserDto)
  }

  async checkPassword(password: string, hash: string) {
    return this.passwordService.compare(password, hash)
  }

  async makeToken(user: User) {
    const token = this.tokenService.createToken(user)
    return new AuthTokenDto(token)
  }
}
