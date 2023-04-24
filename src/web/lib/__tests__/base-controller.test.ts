import { mock } from 'jest-mock-extended'
import { Response } from 'express'

import { BaseController } from 'web/lib/base-controller'
import { IUseCase } from 'utils/types'


const setup = (useCase: IUseCase<unknown, unknown>, res: Response) => {
  class Controller extends BaseController {
    run = (input?: unknown) => {
      return this.executeUseCase(useCase, input, res)
    }
  }

  const { run } = new Controller()
  return { run }
}

describe('BaseController', () => {
  it('Can execute use case', async () => {
    const input = {}
    const mockRes = mock<Response>()
    const mockUseCase = mock<IUseCase<unknown, unknown>>()

    const { run } = setup(mockUseCase, mockRes)
    await run(input)

    expect(mockUseCase.execute).toHaveBeenCalledWith(input)
    expect(mockRes.json).toHaveBeenCalledWith({ data: {}, statusCode: 200 })
  })

  it("Throws exceptions", async () => {
    const exception = new Error()
    const mockRes = mock<Response>()
    const mockUseCase = mock<IUseCase<unknown, unknown>>()
    mockUseCase.execute.mockRejectedValue(exception)

    const { run } = setup(mockUseCase, mockRes)

    await expect(run()).rejects.toBe(exception)
    expect(mockRes.json).not.toHaveBeenCalled()
  })
})
