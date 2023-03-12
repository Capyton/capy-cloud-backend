import { TonAddress, TonNetwork } from "@src/domain/user/types"

export interface AuthManager {
    generateNonce(): string
    validateNonce(nonce: string): void
    validateProof(
        address: TonAddress,
        network: TonNetwork,
        nonce: string,
        signature: string,
    ): void
}
