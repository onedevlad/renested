import { PasswordService } from './password.service'

const setup = () => {
  const passwordService = new PasswordService()

  return { passwordService }
}

describe('PasswordService', () => {
  it('Should hash & unhash password', async () => {
    const { passwordService } = setup()
    const password = "secret123"

    const hash = await passwordService.hash(password)

    expect(password).not.toBe(hash)
    expect(passwordService.compare(password, hash))
  })
})
