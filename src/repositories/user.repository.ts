import { injectable } from 'inversify'
import type { Repository } from 'typeorm'

import { AppDataSource } from 'frameworks/persistance/dataSource'
import { User } from './entities/user.entity'
import { CreateUserDto, UserDto } from 'dtos/index'

@injectable()
export class UserRepository {
  private repository: Repository<User>

  constructor(appDataSource: AppDataSource) {
    this.repository = appDataSource.dataSource.getRepository(User)
  }

  findByEmail = async (email: string) => this.repository.findOneBy({ email })

  async create(createUserDto: CreateUserDto) {
    const user = new User()

    Object.assign(user, createUserDto)
    const newUser = await this.repository.save(user)

    return new UserDto(newUser.id, newUser.firstName, newUser.lastName, newUser.email)
  }
}
