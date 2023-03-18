import { inject, injectable } from 'inversify'
import { TYPES } from 'config/types'
import { UserData } from 'entities/UserData'
import { BusinessErrors, SystemErrors } from 'errors/index'
import { ICreateUserRepository } from 'repositories/CreateUser'
import { CreateUserValidationService } from 'services/validation/createUserValidation'

export interface ICreateUserInput {
  firstName?: string
  lastName?: string
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
    const isUserValid =
      this.createUserValidationService.validate(createUserInput)

    if (!isUserValid) throw new Error(SystemErrors.INVALID_EMAIL)

    const existingUser = await this.userRepository.findByEmail(createUserInput.email)
    if (existingUser) throw new Error(BusinessErrors.USER_EXISTS)

    const res = await this.userRepository.create(
      createUserInput as Required<ICreateUserInput>
    )

    return new UserData(res.id, res.firstName, res.lastName, res.email)
  }
}
