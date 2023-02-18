import { TonAddress, TonNetwork } from "@src/domain/user/types"


export interface AuthManager {
  generateSeed(): string
  getExpirationTime(): Date
  signSeed(seed: string, expirationTime: Date): string
  validateNonce(nonce: string): void
  validateProof(address: TonAddress, network: TonNetwork, nonce: string): void
}
