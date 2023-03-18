import { injectable } from 'inversify'
import { CreateUserDto, UserDto } from 'dtos/index'
import { UserRepository } from 'repositories/user.repository'
import { UserAlreadyExistsException } from 'exceptions/user-already-exists.exception'

@injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async exec(createUserDto: CreateUserDto): Promise<UserDto> {
    const existingUser = await this.userRepository.findByEmail(createUserDto.email)
    if (existingUser) throw new UserAlreadyExistsException()

    const res = await this.userRepository.create(createUserDto)

    return new UserDto(res.id, res.firstName, res.lastName, res.email)
  }
}
