import { inject, injectable } from 'inversify'
import { TYPES } from 'config/types'
import { UserData } from 'entities/UserData'
import { BusinessErrors, SystemErrors } from 'errors/index'
import { ICreateUserRepository } from 'repositories/CreateUser'
import { CreateUserValidationService } from 'services/validation/createUserValidation'

export interface ICreateUserInput {
  name?: string
  email?: string
  password?: string
}

@injectable()
export class CreateUser {
  userRepository: ICreateUserRepository
  createUserValidationService: CreateUserValidationService

  constructor(
    @inject(TYPES.CreateUserRepository) userRepository: ICreateUserRepository,
    @inject(TYPES.CreateUserValidationService)
    createUserValidationService: CreateUserValidationService
  ) {
    this.userRepository = userRepository
    this.createUserValidationService = createUserValidationService
  }

  async exec(createUserInput: ICreateUserInput): Promise<UserData> {
    const isEmailValid =
      this.createUserValidationService.validate(createUserInput)
    if (isEmailValid) throw new Error(SystemErrors.INVALID_EMAIL)

    const res = await this.userRepository.create(
      createUserInput as Required<ICreateUserInput>
    )
    if (res === BusinessErrors.USER_EXISTS) throw new Error(res)

    return new UserData(res.name, res.email)
  }
}
