import { IsNumberString } from 'class-validator'

export class DeleteUserRequestDto {
  @IsNumberString()
  id: string
}
