import { AuthPayload } from "@src/application/auth/dto/payload"
import { AuthManager } from "@src/application/auth/interfaces"


export class GenereatePayload {
}


export class GenereatePayloadHandler {
  constructor(
    private readonly authManager: AuthManager,
  ) {}

  async execute(command: GenereatePayload): Promise<AuthPayload> {
    const seed = this.authManager.generateSeed()
    const expirationTime = this.authManager.getExpirationTime()
    const nonce = this.authManager.signSeed(seed, expirationTime)
    return new AuthPayload(nonce)
  }
}
