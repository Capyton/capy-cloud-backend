import * as dto from "@src/application/auth/dto"

import { AuthManager, JwtManager, UserRepo } from "@src/application/auth/interfaces"
import { Domain, TonApiClient } from "@src/application/auth/interfaces/auth-manager"
import { TonAddress, TonNetwork } from "@src/domain/user/types"
import { RefreshTokenRepo } from "@src/application/auth/interfaces/persistence"
import { UnitOfWork } from "@src/application/common/interfaces"
import { User } from "@src/domain/user/entities"
import { UserAddressNotFound } from "@src/application/user/exceptions"
import { uuid7 } from "@src/utils/uuid"

export class Proof {
    constructor(
        readonly nonce: string,
        readonly signature: string,
        readonly timestamp: number,
        readonly domain: Domain,
    ) { }
}


export class VerifyProof {
    constructor(
        readonly address: TonAddress,
        readonly network: TonNetwork,
        readonly proof: Proof,
        readonly stateInit: string,
    ) { }
}


export class VerifyProofHandler {
    constructor(
        private readonly tonApiClient: TonApiClient,
        private readonly authManager: AuthManager,
        private readonly jwtManager: JwtManager,
        private readonly userRepo: UserRepo,
        private readonly refreshTokenRepo: RefreshTokenRepo,
        private readonly uow: UnitOfWork,
    ) { }

    async execute(command: VerifyProof): Promise<dto.AuthTokens> {
        const pubKey = await this.tonApiClient.getPubKey(command.address, command.network)
        this.authManager.validateProof(
            pubKey,
            command.address,
            command.network,
            command.proof.nonce,
            command.proof.signature,
            command.proof.timestamp,
            command.proof.domain,
            command.stateInit,
        )

        let user: User
        try {
            user = await this.userRepo.getUserByAddress(command.address)
        } catch (err) {
            if (!(err instanceof UserAddressNotFound)) {
                throw err
            }
            user = User.create(uuid7(), command.address)
            await this.userRepo.addUser(user)
            await this.uow.commit()
        }

        const userPayload = new dto.UserPayload(user.id, user.address)
        const accessToken = this.jwtManager.generateAccessToken(userPayload)
        const refreshToken = this.jwtManager.generateRefreshToken(userPayload)
        await this.refreshTokenRepo.addRefreshToken(refreshToken)
        await this.uow.commit()

        return new dto.AuthTokens(accessToken, refreshToken.token)
    }
}
