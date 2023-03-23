import { injectable } from 'inversify'
import { AuthTokenDto, LoginDataDto } from 'modules/auth/dto'
import { IUseCase } from 'utils/types'
import { InvalidCredentialsException } from 'modules/auth/exceptions/invalid-credentials.exception'
import { AuthRepository } from '../auth.repository'
import { PasswordService } from 'services/password/password.service'
import { TokenService } from 'services/token/token.service'

@injectable()
export class LoginUseCase implements IUseCase<LoginDataDto, AuthTokenDto> {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
  ) { }

  async execute(loginData: LoginDataDto): Promise<AuthTokenDto> {
    const user = await this.authRepository.findByEmail(loginData.email)
    if (!user) throw new InvalidCredentialsException()

    const isPasswordCorrect = await this.passwordService.compare(
      loginData.password,
      user.password
    )

    if (!isPasswordCorrect) throw new InvalidCredentialsException()

    return new AuthTokenDto(this.tokenService.createToken(user))
  }
}
