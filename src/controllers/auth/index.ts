import { inject, injectable } from 'inversify'
import type { Response } from 'express'

import { CreateUser } from 'useCases/auth/createUser'
import { BusinessErrors } from 'errors/index'
import { TYPES } from 'config/types'

interface ICreateUserRequest {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
}

@injectable()
export class AuthController {
  createUserUseCase: CreateUser

  constructor(@inject(TYPES.CreateUserUseCase) createUserUseCase: CreateUser) {
    this.createUserUseCase = createUserUseCase
  }

  async register(req: ICreateUserRequest, res: Response) {
    try {
      const userData = await this.createUserUseCase.exec(req)
      res.status(200).send(userData)
    } catch (error) {
      if (error.message === BusinessErrors.USER_EXISTS) res.status(422)
      else res.status(500)

      res.send({ error: error.message })
    }
  }
}
