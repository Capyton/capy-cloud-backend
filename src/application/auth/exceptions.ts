import { ApplicationException } from "../common/exceptions";

export class NonceIsExpired extends ApplicationException {
  constructor(cause?: Error, meatadata?: unknown) {
    super("Nonce is expired", cause, meatadata)
  }
}

export class InvalidNonce extends ApplicationException {
  constructor(cause?: Error, meatadata?: unknown) {
    super("Invalid nonce", cause, meatadata)
  }
}

export class UnknownNonceError extends ApplicationException {
  constructor(cause?: Error, meatadata?: unknown) {
    super("Uknown nonce error", cause, meatadata)
  }
}

export class InvalidProofSignature extends ApplicationException {
  constructor(meatadata?: unknown) {
    super("Invalid proof signature", undefined, meatadata)
  }
}

export class JwtTokenIsExpired extends ApplicationException {
  constructor(cause?: Error, meatadata?: unknown) {
    super("JWT token is expired", cause, meatadata)
  }
}

export class InvalidJwtToken extends ApplicationException {
  constructor(cause?: Error, meatadata?: unknown) {
    super("Invalid JWT token", cause, meatadata)
  }
}

export class UnknownJwtTokenError extends ApplicationException {
  constructor(cause?: Error, meatadata?: unknown) {
    super("Unknown JWT token error", cause, meatadata)
  }
}
