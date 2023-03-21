import { UserEntity } from "modules/user"

export class UserDto {
  id: number
  firstName: string
  lastName: string
  email: string

  static from(user: UserEntity) {
    const dto = new UserDto()

    dto.id = user.id
    dto.firstName = user.firstName
    dto.lastName = user.lastName
    dto.email = user.email

    return dto
  }

  static fromMany(users: UserEntity[]) {
    return users.map(UserDto.from)
  }
}
