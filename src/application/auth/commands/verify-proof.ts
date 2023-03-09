import * as dto from "@src/application/auth/dto"
import { AuthManager, JwtManager, UserRepo } from "@src/application/auth/interfaces"
import { UnitOfWork } from "@src/application/common/interfaces"
import { UserAddressNotFound } from "@src/application/user/exceptions"
import { User } from "@src/domain/user/entities"
import { TonAddress, TonNetwork } from "@src/domain/user/types"
import { uuid7 } from "@src/utils/uuid"


export class Proof {
  constructor(
    // readonly timestamp: number,
    // readonly domain: {lengthBytes: number, value: string},
    readonly signature: string,
    readonly nonce: string,
  ) { }
}


export class VerifyProof {
  constructor(
    readonly address: TonAddress,
    readonly network: TonNetwork,
    readonly proof: Proof,
  ) {
    // const data = command.address.split(":")
    // if (data.length == 2) {
    //   throw WrongTonAddressFormat(command.address)
    // }
    // const [workchain, walletAddress] = data
  }
}


export class VerifyProofHandler {
  constructor(
    private readonly authManager: AuthManager,
    private readonly jwtManager: JwtManager,
    private readonly userRepo: UserRepo,
    private readonly uow: UnitOfWork,
  ) { }

  async execute(command: VerifyProof): Promise<dto.AuthToken> {
    this.authManager.validateNonce(command.proof.nonce)

    this.authManager.validateProof(
      command.address,
      command.network,
      command.proof.nonce,
      command.proof.signature,
      // workchain, walletAddress,
    )

    let user: User
    try {
      user = await this.userRepo.getUserByAddress(command.address)
    } catch (error: any) {
      if (!(error instanceof UserAddressNotFound)) {
        throw error
      }
      user = User.create(uuid7(), command.address)
      await this.userRepo.addUser(user)
      await this.uow.commit()
    }

    const token = this.jwtManager.generateToken(new dto.UserPayload(user.id, user.address))
    return new dto.AuthToken(token)
  }
}
