import { injectable } from 'inversify'
import type { Repository } from 'typeorm'

import { AppDataSource } from 'web/persistance/dataSource'
import { User } from 'repositories/entities/user.entity'
import { CreateUserDto, UserDto } from 'dtos/index'

@injectable()
export class UserRepository {
  private repository: Repository<User>

  constructor(appDataSource: AppDataSource) {
    this.repository = appDataSource.dataSource.getRepository(User)
  }

  findByEmail = async (email: string) => this.repository.findOneBy({ email })

  async create(createUserDto: CreateUserDto) {
    const user = Object.assign(new User(), createUserDto)

    const userModel = await this.repository.save(user)
    return UserDto.from(userModel)
  }

  async listAll() {
    const users = await this.repository.find()
    return users.map(UserDto.from)
  }
}
