export class AppExceptions extends Error {
  constructor(
    readonly message: string,
    readonly cause?: Error,
    readonly meatadata?: unknown,
  ) {
    super(message)
    Error.captureStackTrace(this, this.constructor);
  }
}

export class DomainExceptions extends AppExceptions {}
