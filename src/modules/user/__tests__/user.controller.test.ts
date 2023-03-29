import { mock } from 'jest-mock-extended'
import supertest from 'supertest'

import { createTestingServer } from 'utils/test/create-testing-server'
import { DeleteUserUseCase } from '../use-cases/delete-user.use-case'
import { ListUsersUseCase } from '../use-cases/list-users.use-case'
import { createTestToken } from 'utils/test/create-test-token'
import { PaginationData } from 'utils/types'
import { UserDto } from '../dto'
import { Container } from 'inversify'
import { UserController } from '../user.controller'

const deleteUserUseCase = mock<DeleteUserUseCase>()
const listUsersUseCase = mock<ListUsersUseCase>()

const setup = () => {
  const container = new Container()
  container.bind(UserController)
  container.bind(DeleteUserUseCase).toConstantValue(deleteUserUseCase)
  container.bind(ListUsersUseCase).toConstantValue(listUsersUseCase)

  const app = createTestingServer(container)
  const token = createTestToken()

  return { app, token }
}

describe('User controller', () => {
  describe('GET /', () => {
    it('Should validate authorization', async () => {
      const { app } = setup()

      const res = await supertest(app).get('/users').send()
      const { data, statusCode, errors } = res.body

      expect(data).toBe(null)
      expect(statusCode).toBe(403)
      expect(errors.length).toBeGreaterThan(0)
    })

    it('Should list users', async () => {
      const { app, token } = setup()

      const mockUsers: UserDto[] = []
      listUsersUseCase.execute.mockResolvedValue(mockUsers)

      const pagination: PaginationData = { skip: 5, take: 10 }

      const res = await supertest(app)
        .get('/users')
        .query(pagination)
        .set('Authorization', token)

      expect(listUsersUseCase.execute).toHaveBeenCalledWith(pagination)
      expect(res.body.data).toStrictEqual(mockUsers)
      expect(res.body.statusCode).toBe(200)
    })
  })

  describe('DELETE /:id', () => {
    it('Should format request correctly', async () => {
      const { app } = setup()
      deleteUserUseCase.execute.mockResolvedValue()

      const token = createTestToken({ id: 10, email: 'admin@email.com' })
      await supertest(app).delete('/users/20').set('Authorization', token)

      expect(deleteUserUseCase.execute).toHaveBeenCalledWith({
        id: 20,
        myUserId: 10,
      })
    })
  })
})
