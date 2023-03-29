export class DeleteUserDto {
  public id: number
  public myUserId: number

  static from(dto: Partial<DeleteUserDto>): DeleteUserDto {
    return Object.assign(new DeleteUserDto(), dto)
  }
}
