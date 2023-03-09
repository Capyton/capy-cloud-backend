import { AuthPayload } from "@src/application/auth/dto/payload"
import { AuthManager } from "@src/application/auth/interfaces"


export class GenereatePayload {
}


export class GenereatePayloadHandler {
  constructor(
    private readonly authManager: AuthManager,
  ) { }

  execute(command: GenereatePayload): AuthPayload {
    const nonce = this.authManager.generateNonce()
    return new AuthPayload(nonce)
  }
}
