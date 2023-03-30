import { mock } from 'jest-mock-extended'
import { Container } from 'inversify'

import { PasswordService } from 'services/password/password.service'
import { TokenService } from 'services/token/token.service'
import { AuthRepository } from 'modules/auth/auth.repository'
import { InvalidCredentialsException } from 'modules/auth/exceptions'
import { LoginDataDto } from 'modules/auth/dto'
import { UserEntity } from 'modules/user/user.entity'

import { LoginUseCase } from '../login.use-case'

const setup = () => {
  const mockAuthRepository = mock<AuthRepository>()
  const mockPasswordService = mock<PasswordService>()
  const mockTokenService = mock<TokenService>()

  const container = new Container()

  container.bind(LoginUseCase).toSelf()
  container.bind(AuthRepository).toConstantValue(mockAuthRepository)
  container.bind(TokenService).toConstantValue(mockTokenService)
  container.bind(PasswordService).toConstantValue(mockPasswordService)

  const loginUseCase = container.get(LoginUseCase)

  return {
    loginUseCase,
    mockPasswordService,
    mockTokenService,
    mockAuthRepository,
  }
}

describe('Login use case', () => {
  it("Should fail if user doesn't exist", async () => {
    const { loginUseCase, mockAuthRepository } = setup()
    const loginData: LoginDataDto = { email: '', password: '' }

    mockAuthRepository.findByEmail.mockResolvedValue(null)

    expect(loginUseCase.execute(loginData)).rejects.toBeInstanceOf(
      InvalidCredentialsException
    )
  })

  it("Should fail if provided password is incorrect", async () => {
    const { loginUseCase, mockAuthRepository, mockPasswordService } = setup()
    const loginData: LoginDataDto = { email: '', password: '' }

    mockAuthRepository.findByEmail.mockResolvedValue(new UserEntity())
    mockPasswordService.compare.mockResolvedValue(false)

    expect(loginUseCase.execute(loginData)).rejects.toBeInstanceOf(
      InvalidCredentialsException
    )
  })

  it('Should create a token on successful login', async () => {
    const { loginUseCase, mockAuthRepository, mockPasswordService, mockTokenService } = setup()
    const loginData: LoginDataDto = { email: '', password: '' }
    const token = "TRUST_ME_IM_A_VALID_TOKEN"

    mockAuthRepository.findByEmail.mockResolvedValue(new UserEntity())
    mockPasswordService.compare.mockResolvedValue(true)
    mockTokenService.createToken.mockReturnValue(token)

    const res = await loginUseCase.execute(loginData)
    expect(res.token).toBe(token)
  })
})
