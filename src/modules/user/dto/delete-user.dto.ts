interface DeleteUserParams {
  id: number
  myUserId: number
}

export class DeleteUserDto {
  public id: number
  public myUserId: number

  constructor(params: DeleteUserParams) {
    this.id = params.id
    this.myUserId = params.myUserId
  }
}
