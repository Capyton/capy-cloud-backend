import { TonAddress, TonNetwork } from "@src/domain/user/types"

export interface Domain {
    lengthBytes: number
    value: string
}

export interface AuthManager {
    generateNonce(): string
    validateNonce(nonce: string): void
    validateProof(
        pubKey: string,
        address: TonAddress,
        network: TonNetwork,
        nonce: string,
        signature: string,
        timestamp: number,
        domain: Domain,
        stateInit: string,
    ): void
}

export interface TonApiClient {
    getPubKey(address: TonAddress, network: TonNetwork): Promise<string>
}
