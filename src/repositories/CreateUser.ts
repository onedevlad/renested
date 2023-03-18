import { inject, injectable } from 'inversify'
import { AppDataSource } from 'frameworks/persistance/dataSource'
import { TYPES } from 'config/types'
import { User } from './UserEntity'
import { Repository } from 'typeorm'

interface IOutCreatedUserDTO {
  id: number
  firstName: string
  lastName: string
  email: string
}

interface IInCreatedUserDTO {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface ICreateUserRepository {
  findByEmail(email: string): Promise<User>
  create(createdUserData: IInCreatedUserDTO): Promise<IOutCreatedUserDTO>
}

@injectable()
export class CreateUserRepository implements ICreateUserRepository {
  repository: Repository<User>

  constructor(@inject(TYPES.AppDataSource) appDataSource: AppDataSource) {
    this.repository = appDataSource.dataSource.getRepository(User)
  }

  findByEmail = async (email: string) => this.repository.findOneBy({ email })

  async create(userData: IInCreatedUserDTO) {
    const user = new User()

    user.firstName = userData.firstName
    user.lastName = userData.lastName
    user.email = userData.email
    user.password = userData.password

    const newUser = await this.repository.save(user)

    const result: IOutCreatedUserDTO = {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    }

    return result
  }
}
