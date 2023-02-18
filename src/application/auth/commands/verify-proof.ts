import { AuthToken } from "@src/application/auth/dto"
import { AuthManager, AuthRepo, JwtManager } from "@src/application/auth/interfaces"
import { UnitOfWork } from "@src/application/common/interfaces"
import { TonAddress, TonNetwork } from "@src/domain/user/types"


export class Proof {
  constructor(
    readonly timestamp: number,
    readonly domain: {lengthBytes: number, value: string},
    readonly signature: string,
    readonly payload: string,
  ) {}
}


export class VerifyProof {
  constructor(
    readonly address: TonAddress,
    readonly network: TonNetwork,
    readonly proof: Proof,
  ) {}
}


export class VerifyProofHandler {
  constructor(
    private readonly authManager: AuthManager,
    private readonly jwtManager: JwtManager,
    private readonly authRepo: AuthRepo,
    private readonly userRepo: UserRepo,
    private readonly uow: UnitOfWork,
  ) {}

  async execute(command: VerifyProof): Promise<AuthToken> {
    const payload = await this.authRepo.getPayloadByNonce(command.proof.payload)
    payload.validateNotExpired()
    const verified = this.authManager.verifySignature(command.proof.payload, payload.signature)
    if (!verified) {
      throw PayloadVerificationFailed()
    }
    const data = command.address.split(":")
    if (data.length == 2) {
      throw WrongTonAddressFormat(command.address)
    }
    const [workchain, walletAddress] = data
    const proofVerified = this.authManager.verifyProof(command.address, command.network, workchain, walletAddress)

    const user = User.create(command.id, command.address)
    await this.userRepo.addUser(user)
    await this.uow.commit()

    const token = this.jwtManager.generateToken(user)
    return new AuthToken(token)
  }
}
