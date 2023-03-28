import { mock } from 'jest-mock-extended'
import supertest from 'supertest'

import { createTestingModule } from 'utils/test/create-testing-module'
import { AuthModule } from '../auth.module'
import { Repository } from 'typeorm'
import { User as UserEntity } from 'modules/user/user.entity'

import { makeMockDataSource } from 'utils/test/mockDataSource'
import { createTestingServer } from 'utils/test/create-testing-server'
import { LoginUseCase } from '../use-cases/login.use-case'
import { RegisterUserUseCase } from '../use-cases/register-user.use-case'
import {
  InvalidCredentialsException,
  UserAlreadyExistsException,
} from '../exceptions'

const loginUseCase = mock<LoginUseCase>()
const registerUserUseCase = mock<RegisterUserUseCase>()

const setup = () => {
  const mockUserRepository = mock<Repository<UserEntity>>()
  const mockDataSource = makeMockDataSource(mockUserRepository)

  const container = createTestingModule(AuthModule)
  container.rebind(LoginUseCase).toConstantValue(loginUseCase)
  container.rebind(RegisterUserUseCase).toConstantValue(registerUserUseCase)
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
      expect(errors.length).toBeGreaterThan(0)
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

  describe('/register', () => {
    it('Validates input', async () => {
      const { app } = setup()

      const res = await supertest(app).post('/auth/register').send({})
      const { data, statusCode, errors } = res.body

      expect(data).toBe(null)
      expect(statusCode).toBe(422)
      expect(errors.length).toBeGreaterThan(0)
    })

    it('Handles downstream exceptions', async () => {
      const { app } = setup()
      const exception = new UserAlreadyExistsException()
      registerUserUseCase.execute.mockRejectedValue(exception)

      const res = await supertest(app).post('/auth/register').send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'jdoe@email.com',
        password: 'secret123',
      })

      expect(res.body.data).toBe(null)
      expect(res.body.statusCode).toBe(422)
      expect(res.body.errors.length).toBeGreaterThan(0)
    })
  })
})
