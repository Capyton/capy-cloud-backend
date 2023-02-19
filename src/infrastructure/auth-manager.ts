import jwt from "jsonwebtoken"
import { AuthManager } from "@src/application/auth/interfaces"
import { TonNetwork } from "@src/domain/user/types"
import * as crypto from "crypto"
import { InvalidNonce, InvalidProofSignature, NonceIsExpired, UnknownNonceError } from "@src/application/auth/exceptions"

export class AuthManagerImpl implements AuthManager {
  constructor(
    private readonly privateKey: string,
    private readonly nonceExpirationTime: number = 10 * 60 * 1000,  // 10 minutes in milliseconds
  ) {}

  generateNonce(): string {
    // payload of this nonce after sign will contain { iat: Date.now(), exp: iap + this.nonceExpirationTime }
    const payload = {}
    const nonce = jwt.sign(payload, this.privateKey, { algorithm: "HS256", expiresIn: this.nonceExpirationTime })
    return nonce
  }

  validateNonce(nonce: string): void {
    jwt.verify(
      nonce, this.privateKey,
      { algorithm: "HS256" },
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
        } else {
          // Nonce is valid
          console.log("Nonce is valid")
          console.log(decoded)  // This is the decoded payload of the nonce
        }
      },
    )
  }

  validateProof(
    address: string,
    network: TonNetwork,
    nonce: string,
    signature: string,
  ): void {
    const hash = crypto.createHash("sha256").update(nonce).digest()
    const verify = crypto.createVerify("RSA-SHA256")
    verify.write(hash)
    verify.end()
    const isValid = verify.verify(address, signature, "base64")
    if (!isValid) {
      throw new InvalidProofSignature()
    }
  }
}
