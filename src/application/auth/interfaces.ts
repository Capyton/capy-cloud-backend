import { Payload } from "@src/domain/auth/entites"


export interface AuthManager {
  generateNonce(): string
  signNonce(nonce: string): string
  getExpirationTime(): Date
}

export interface AuthRepo {
  savePayload(payload: Payload): Promise<void>
}

export interface JwtManager {

}
