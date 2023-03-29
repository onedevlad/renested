import { mock } from 'jest-mock-extended'
import supertest from 'supertest'

import { createTestingServer } from 'utils/test/create-testing-server'
import { LoginUseCase } from '../use-cases/login.use-case'
import { RegisterUserUseCase } from '../use-cases/register-user.use-case'
import {
  InvalidCredentialsException,
  UserAlreadyExistsException,
} from '../exceptions'
import { AuthController } from '../auth.controller'
import { Container } from 'inversify'

const loginUseCase = mock<LoginUseCase>()
const registerUserUseCase = mock<RegisterUserUseCase>()

const setup = () => {
  const container = new Container()

  container.bind(AuthController).toSelf()
  container.bind(LoginUseCase).toConstantValue(loginUseCase)
  container.bind(RegisterUserUseCase).toConstantValue(registerUserUseCase)

  const app = createTestingServer(container)

  return { app }
}

describe('Auth controller', () => {
  describe('/login', () => {
    it('Validates input', async () => {
      const { app } = setup()

      const res = await supertest(app).post('/auth/login').send({})
      loginUseCase.execute.mockResolvedValue({ token: '' })
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
