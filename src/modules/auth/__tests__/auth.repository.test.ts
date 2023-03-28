import { mock } from 'jest-mock-extended'

import { createTestingModule } from 'utils/test/create-testing-module'
import { AuthModule } from '../auth.module'
import { AuthRepository } from '../auth.repository'
import { AppDataSource } from 'web/persistance/dataSource'
import { Repository } from 'typeorm'
import { User as UserEntity } from 'modules/user/user.entity'
import { CreateUserDto } from '../dto'

import { makeMockDataSource } from 'utils/test/mockDataSource'

const setup = () => {
  const mockUserRepository = mock<Repository<UserEntity>>()
  const mockDataSource = makeMockDataSource(mockUserRepository)

  const moduleRef = createTestingModule(AuthModule)
  moduleRef.bind(AppDataSource).toConstantValue(mockDataSource)

  const authRepository = moduleRef.get(AuthRepository)

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
