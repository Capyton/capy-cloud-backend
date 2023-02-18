import { AuthManager } from "@src/application/auth/interfaces";


export class AuthManagerImpl implements AuthManager {
  validateNonce(nonce: string): void {
    if (!nonceVerified) {
      throw NonceIsNotVerified(command.proof.nonce)
    }

    const expired = this.authManager.validateNonce(command.proof.nonce)
    if (!expired) {
      throw NonceIsExpired(command.proof.nonce)
    }
  }
}
