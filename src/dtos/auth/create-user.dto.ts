import { IsEmail, Length } from "class-validator"

export class CreateUserDto {
  @Length(2, 100, { message: "First name should contain 2-100 characters" })
  firstName: string

  @Length(2, 100, { message: "Last name should contain 2-100 characters" })
  lastName: string

  @IsEmail({}, { message: "Invalid email" })
  email: string

  @Length(8, 100, { message: "Invalid password" })
  password: string
}
