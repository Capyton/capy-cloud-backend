export class AuthPayload {
  constructor(
    readonly payload: string,
  ) {}
}

export class AuthToken {
  constructor(
    readonly token: string,
  ) {}
}
