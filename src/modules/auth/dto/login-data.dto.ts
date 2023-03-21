import { IsString } from "class-validator"

export class LoginDataDto {
  @IsString()
  email: string

  @IsString()
  password: string
}
