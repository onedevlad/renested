import { mock } from 'jest-mock-extended'
import { Container } from 'inversify'
import { Repository } from 'typeorm'
import { AuthRepository } from '../auth.repository'
import { AppDataSource } from 'web/persistance/dataSource'
import { UserEntity } from 'modules/user/user.entity'
import { CreateUserDto } from '../dto'

import { makeMockDataSource } from 'utils/test/mockDataSource'

const setup = () => {
  const mockUserRepository = mock<Repository<UserEntity>>()
  const mockDataSource = makeMockDataSource(mockUserRepository)

  const container = new Container()
  container.bind(AuthRepository).toSelf()
  container.bind(AppDataSource).toConstantValue(mockDataSource)

  const authRepository = container.get(AuthRepository)

  return { authRepository, mockUserRepository }
}

describe('Auth Repository', () => {
  it('Should find users by email', async () => {
    const { authRepository, mockUserRepository } = setup()

    const user = new UserEntity()
    mockUserRepository.findOneBy.mockResolvedValue(user)

    const actual = await authRepository.findByEmail(user.email)

    expect(actual).toEqual(user)
  })

  it('Should handle non-existent users', async () => {
    const { authRepository, mockUserRepository } = setup()
    const user = null
    mockUserRepository.findOneBy.mockResolvedValue(user)

    const actual = await authRepository.findByEmail('')
    expect(actual).toEqual(user)
  })

  it('Should create a new user', async () => {
    const { authRepository, mockUserRepository } = setup()
    const createUserDto = new CreateUserDto()
    const userEntity = new UserEntity()

    mockUserRepository.save.mockResolvedValue(userEntity)

    const actual = await authRepository.create(createUserDto)

    expect(actual).toEqual(userEntity)
  })
})
