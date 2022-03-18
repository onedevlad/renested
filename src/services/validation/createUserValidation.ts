import { injectable } from 'inversify'
interface ICreateUserInput {
  name?: string
  email?: string
  password?: string
}

@injectable()
export class CreateUserValidationService {
  validate({ name, email, password }: ICreateUserInput) {
    return !!(name && email && password)
  }
}
