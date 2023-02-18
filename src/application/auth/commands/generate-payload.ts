import { AuthPayload } from "@src/application/auth/dto"
import { AuthManager, AuthRepo } from "@src/application/auth/interfaces"
import { Payload } from "@src/domain/auth/entites"


// export class GenereatePayload {
//   constructor() {}
// }


export class GenereatePayloadHandler {
  constructor(
    private readonly authManager: AuthManager,
    private readonly authRepo: AuthRepo,
  ) {}

  async execute(): Promise<AuthPayload> {
    const nonce = this.authManager.generateNonce()
    const signature = this.authManager.signNonce(nonce)
    const expirationTime = this.authManager.getExpirationTime()
    const payload = Payload.create(nonce, signature, expirationTime)
    await this.authRepo.savePayload(payload)
    return new AuthPayload(nonce)
  }
}
