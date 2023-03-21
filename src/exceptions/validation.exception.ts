export class ValidationException extends Error {
  constructor(public readonly msgs: string[]) {
    super(msgs.join('\n'))
  }
}
