import { inject, injectable } from 'inversify'

import { CreateUser } from "../../useCases/auth/createUser";
import type { Response } from "express"
import {BusinessErrors} from "../../errors";
import {TYPES} from '../../config/types';

interface ICreateUserRequest {
  name?: string
  email?: string
  password?: string
}

@injectable()
export class AuthController {
  createUserUseCase: CreateUser

  constructor(
    @inject(TYPES.CreateUserUseCase) createUserUseCase: CreateUser,
  ) {
    this.createUserUseCase = createUserUseCase
  }

  async register(req: ICreateUserRequest, res: Response) {
    try {
      const userData = await this.createUserUseCase.exec(req)
      res.status(200).send(userData)
    } catch(error) {
      if(error.message === BusinessErrors.USER_EXISTS) res.status(422).send({ error: error.message })
      throw error
    }
  }
}
