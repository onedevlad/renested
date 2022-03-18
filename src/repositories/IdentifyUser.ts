interface IIdentifiedUserDTO {
  name: string
  email: string
  password: string
}

export interface IIdentifyUserRepository {
  identify(email: string, password: string): IIdentifiedUserDTO
}
