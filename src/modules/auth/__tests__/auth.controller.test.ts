import { mock } from 'jest-mock-extended'
import supertest from 'supertest'

import { createTestingModule } from 'utils/test/create-testing-module'
import { AuthModule } from '../auth.module'
import { Repository } from 'typeorm'
import { User as UserEntity } from 'modules/user/user.entity'

import { makeMockDataSource } from 'utils/test/mockDataSource'
import { createTestingServer } from 'utils/test/create-testing-server'
import { LoginUseCase } from '../use-cases/login.use-case'
import { InvalidCredentialsException } from '../exceptions'

const loginUseCase = mock<LoginUseCase>()

const setup = () => {
  const mockUserRepository = mock<Repository<UserEntity>>()
  const mockDataSource = makeMockDataSource(mockUserRepository)

  const container = createTestingModule(AuthModule)
  container.rebind(LoginUseCase).toConstantValue(loginUseCase)
  const app = createTestingServer(container, mockDataSource)

  return { app, mockUserRepository }
}

describe('Auth controller', () => {
  describe('/login', () => {
    it('Validates input', async () => {
      const { app } = setup()

      const res = await supertest(app).post('/auth/login').send({})
      const { data, statusCode, errors } = res.body

      expect(data).toBe(null)
      expect(statusCode).toBe(422)
      expect(errors.length).toBe(2)
    })

    it('Handles downstream exceptions', async () => {
      const { app } = setup()
      const exception = new InvalidCredentialsException()
      loginUseCase.execute.mockRejectedValue(exception)

      const res = await supertest(app)
        .post('/auth/login')
        .send({ email: '', password: '' })

      expect(res.body).toEqual({
        data: null,
        statusCode: 403,
        errors: [exception.message],
      })
    })
  })
})
