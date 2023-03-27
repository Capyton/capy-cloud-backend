import { Address } from "ton-core"
import jwt from "jsonwebtoken"

import { InvalidNonce, InvalidProofSignature, NonceIsExpired, ProofIsExpired, UnknownNonceError } from "@src/application/auth/exceptions"
import { TonAddress, TonNetwork } from "@src/domain/user/types"
import { createMessage, signatureVerify } from "./verification"
import { AuthManager } from "@src/application/auth/interfaces"
import { Domain } from "@src/application/auth/interfaces/auth-manager"


export class AuthManagerImpl implements AuthManager {
    constructor(
        private readonly privateKey: string,
        private readonly nonceExpirationTime: number = 10 * 60,  // 10 minutes in seconds
        private readonly proofExpirationTime: number = 10 * 60,  // 10 minutes in seconds
    ) { }

    generateNonce(): string {
        // payload of this nonce after sign will contain { iat: Date.now(), exp: iap + this.nonceExpirationTime }
        const payload = {}
        const nonce = jwt.sign(payload, this.privateKey, { algorithm: "HS256", expiresIn: this.nonceExpirationTime })
        return nonce
    }

    validateProof(
        pubKey: string,
        address: TonAddress,
        network: TonNetwork,
        nonce: string,
        signature: string,
        timestamp: number,
        domain: Domain,
        stateInit: string,
    ): void {
        // Validate nonce
        this.validateNonce(nonce)
    
        const tonAddress = Address.parse(address)
        const proofSignature = Buffer.from(signature, "base64")
        const proofMessage = createMessage({
            workChain: tonAddress.workChain,
            address: tonAddress.hash,
            timestamp,
            domain,
            signature: proofSignature,
            payload: nonce,
            stateInit,
        })
        const isValid = signatureVerify(Buffer.from(pubKey, "hex"), proofMessage, proofSignature)
        if (!isValid) {
            throw new InvalidProofSignature()
        }

        // Validate proof expiration
        if (timestamp + this.proofExpirationTime < Math.floor(Date.now() / 1000)) {
            throw new ProofIsExpired()
        }
    }

    validateNonce(nonce: string): void {
        jwt.verify(
            nonce, this.privateKey,
            { algorithms: ["HS256"], complete: true },
            (err: jwt.VerifyErrors | null, decoded: object | undefined) => {
                if (err) {
                    // Handle verification errors
                    if (err instanceof jwt.TokenExpiredError) {
                        throw new NonceIsExpired(err)
                    } else if (err instanceof jwt.JsonWebTokenError) {
                        throw new InvalidNonce(err)
                    } else {
                        throw new UnknownNonceError(err)
                    }
                }

                console.debug("Nonce is valid")
                console.debug(decoded)  // This is the decoded payload of the nonce
            },
        )
    }
}
