import { AuthTokenDto } from 'dtos/auth/auth-token.dto'
import { LoginDataDto } from 'dtos/auth/login-data.dto'
import { InvalidCredentialsException } from 'exceptions/invalid-credentials.exception'
import { injectable } from 'inversify'
import { AuthService } from 'services/auth/auth.service'
import { IUseCase } from 'utils/types'

@injectable()
export class LoginUseCase implements IUseCase<LoginDataDto, AuthTokenDto> {
  constructor(private readonly authService: AuthService) { }

  async execute(loginData: LoginDataDto): Promise<AuthTokenDto> {
    const user = await this.authService.findUserByEmail(loginData.email)
    if (!user) throw new InvalidCredentialsException()

    const isPasswordCorrect = await this.authService.checkPassword(
      loginData.password,
      user.password
    )

    if (!isPasswordCorrect) throw new InvalidCredentialsException()

    return this.authService.makeToken(user)
  }
}
