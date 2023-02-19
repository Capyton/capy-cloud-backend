import { AuthPayload } from "@src/application/auth/dto/payload"
import { AuthManager } from "@src/application/auth/interfaces"


export class GenereatePayload {
}


export class GenereatePayloadHandler {
  constructor(
    private readonly authManager: AuthManager,
  ) {}

  async execute(command: GenereatePayload): Promise<AuthPayload> {
    const nonce = this.authManager.generateNonce()
    return new AuthPayload(nonce)
  }
}
