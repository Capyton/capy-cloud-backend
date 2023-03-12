import { AuthManager } from "@src/application/auth/interfaces"
import { AuthPayload } from "@src/application/auth/dto/payload"

export class GenereatePayload { }


export class GenereatePayloadHandler {
    constructor(
        private readonly authManager: AuthManager,
    ) { }

    execute(_command: GenereatePayload): AuthPayload {
        const nonce = this.authManager.generateNonce()
        return new AuthPayload(nonce)
    }
}
