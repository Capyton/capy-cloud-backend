import { AuthManager } from "@src/application/auth/interfaces"
import { TonNetwork } from "@src/domain/user/types"
import * as crypto from "crypto"

export class AuthManagerImpl implements AuthManager {
  constructor(
    private readonly privateKey: string,
    private readonly publicKey: string,
    private readonly nonceExpirationTime: number = 10 * 60 * 1000,  // 10 minutes in milliseconds
  ) {}

  generateSeed(): string {
    // generate a random string like "b9e923e47c217d170d93d4dac6d9f9e68abd83d0"
    const seed = crypto.randomBytes(20).toString("hex")
    return seed
  }

  getExpirationTime(): Date {
    // expiration time is now + 10 minutes
    return new Date(Date.now() + this.nonceExpirationTime)
  }

  signSeed(seed: string, expirationTime: Date): string {
    const data = seed
    const sign = crypto.createSign("RSA-SHA256")
    sign.write(data)
    sign.end()
    const signature = sign.sign(this.privateKey, "base64")
    const exp = expirationTime.getTime()
    return `${exp}.${signature}`
  }

  validateNonce(nonce: string): void {
    const data = nonce.split(".")
    if (data.length !== 2) {
      throw WrongNonceFormat()
    }

    const [timestamp, signature] = data
    if (Date.now() > Number(timestamp)) {
      throw NonceIsExpired()
    }

    const verify = crypto.createVerify("RSA-SHA256");
    verify.write(timestamp);
    verify.end();

    const isVerified = verify.verify(this.publicKey, signature, "base64");
    if (!isVerified) {
      throw NonceIsNotVerified(nonce)
    }
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
