import { injectable } from 'inversify'
import { CreateUserDto, UserDto } from 'dtos/index'
import { UserRepository } from 'repositories/user.repository'
import { UserAlreadyExistsException } from 'exceptions/user-already-exists.exception'
import { PaginationData } from 'utils/types'

@injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const existingUser = await this.userRepository.findByEmail(createUserDto.email)
    if (existingUser) throw new UserAlreadyExistsException()

    return this.userRepository.create(createUserDto)
  }

  async listUsers(paginationData: PaginationData): Promise<UserDto[]> {
    return this.userRepository.listAll(paginationData)
  }
}
