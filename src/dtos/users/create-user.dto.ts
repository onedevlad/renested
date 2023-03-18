import { ValidationException } from "exceptions/index"

export class CreateUserDto {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string,
  ) {}

  static from(body: Partial<CreateUserDto>) {
    if (!body.firstName) throw new ValidationException('Missing firstName')
    if (!body.lastName) throw new ValidationException('Missing lastName')
    if (!body.email) throw new ValidationException('Missing email')
    if (!body.password) throw new ValidationException('Missing password')

    return new CreateUserDto(body.firstName, body.lastName, body.email, body.password)
  }
}
