import { injectable } from 'inversify'
import type { Repository } from 'typeorm'

import { AppDataSource } from 'web/persistance/dataSource'
import { User } from 'repositories/entities/user.entity'
import { CreateUserDto, UserDto } from 'dtos/index'
import { PaginationData } from 'utils/types'

@injectable()
export class UserRepository {
  private repository: Repository<User>

  constructor(appDataSource: AppDataSource) {
    this.repository = appDataSource.dataSource.getRepository(User)
  }

  async findByEmail(email: string) {
   const user = await this.repository.findOneBy({ email })
   return user || null
  }

  async create(createUserDto: CreateUserDto) {
    const user = Object.assign(new User(), createUserDto)

    const userModel = await this.repository.save(user)
    return UserDto.from(userModel)
  }

  async listAll(paginationData: PaginationData) {
    const users = await this.repository.find(paginationData)
    return UserDto.fromMany(users)
  }
}
