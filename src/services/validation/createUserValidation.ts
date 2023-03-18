import { injectable } from 'inversify'
interface ICreateUserInput {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
}

@injectable()
export class CreateUserValidationService {
  validate = ({ firstName, lastName, email, password }: ICreateUserInput) =>
    !!(firstName && lastName && email && password)
}
