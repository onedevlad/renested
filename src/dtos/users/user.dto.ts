export class UserDto {
  constructor(
    public readonly id: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
  ) {}

  static from(body: Partial<UserDto>) {
    return new UserDto(body.id, body.firstName, body.lastName, body.email)
  }
}
