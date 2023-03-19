import { User } from "repositories/entities/user.entity"

export class UserDto {
  id: number
  firstName: string
  lastName: string
  email: string

  static from(user: User) {
    const dto = new UserDto()

    dto.id = user.id
    dto.firstName = user.firstName
    dto.lastName = user.lastName
    dto.email = user.email

    return dto
  }
}
