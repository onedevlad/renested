import { injectable } from 'inversify'
import type { Repository } from 'typeorm'

import { AppDataSource } from 'web/persistance/dataSource'
import { User as UserEntity } from './user.entity'
import { UserDto } from './dto/user.dto'
import { PaginationData } from 'utils/types'

@injectable()
export class UserRepository {
  private repository: Repository<UserEntity>

  constructor(appDataSource: AppDataSource) {
    this.repository = appDataSource.dataSource.getRepository(UserEntity)
  }

  async findByEmail(email: string) {
   const user = await this.repository.findOneBy({ email })
   return user || null
  }

  async listAll(paginationData: PaginationData) {
    const users = await this.repository.find(paginationData)
    return UserDto.fromMany(users)
  }

  async deleteUser(id: number) {
    await this.repository.delete({ id })
  }
}
