import { injectable } from 'inversify'
import type { Repository } from 'typeorm'

import { AppDataSource } from 'web/persistance/dataSource'
import { UserEntity } from 'modules/user/user.entity'
import { CreateUserDto } from './dto'

@injectable()
export class AuthRepository {
  private repository: Repository<UserEntity>

  constructor(appDataSource: AppDataSource) {
    this.repository = appDataSource.getRepository(UserEntity)
  }

  async findByEmail(email: string) {
    const user = await this.repository.findOneBy({ email })
    return user || null
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = Object.assign(new UserEntity(), createUserDto)

    return this.repository.save(user)
  }
}
