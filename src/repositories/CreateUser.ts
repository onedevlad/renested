import { injectable  } from "inversify"
import { BusinessErrors } from "../errors"

interface IOutCreatedUserDTO {
  name: string
  email: string
}

interface IInCreatedUserDTO {
  name: string
  email: string
  password: string
}

export interface ICreateUserRepository {
  create (createdUserData: IInCreatedUserDTO): Promise<IOutCreatedUserDTO | BusinessErrors.USER_EXISTS>
}

@injectable()
export class CreateUserRepository {
  async create (createdUserData: IInCreatedUserDTO) {
    return BusinessErrors.USER_EXISTS
  }
}
