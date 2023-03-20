import { injectable } from 'inversify'
import jwt from 'jsonwebtoken'

import { CreateUserDto, UserDto } from 'dtos/index'
import { UserRepository } from 'repositories/user.repository'
import { PasswordService } from 'services/password/password.service'
import { AuthTokenDto } from 'dtos/auth/auth-token.dto'
import { User } from 'repositories/entities/user.entity'

@injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService
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
    const token = jwt.sign(
      { data: { id: user.id, email: user.email } },
      process.env.JWT_SECRET,
      { expiresIn: '1y' }
    )

    return new AuthTokenDto(token)
  }
}
