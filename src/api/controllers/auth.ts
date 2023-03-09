import { BadRequestException, Body, Controller, Get, Post } from "@nestjs/common"
import {
    AuthManager as ParamAuthManager,
    AuthUserRepo as ParamAuthUserRepo,
    JwtManager as ParamJwtManager,
    UnitOfWork as ParamUnitOfWork
} from "@src/api/param_decorators"
import { GenereatePayload, GenereatePayloadHandler } from "@src/application/auth/commands/generate-payload"
import { Proof, VerifyProof, VerifyProofHandler } from "@src/application/auth/commands/verify-proof"
import { AuthPayload, AuthToken } from "@src/application/auth/dto"
import { AuthManager, JwtManager, UserRepo } from "@src/application/auth/interfaces"
import { UnitOfWork } from "@src/application/common/interfaces"
import { TonAddress, TonNetwork } from "@src/domain/user/types"

@Controller("auth")
export class AuthController {
    @Get("payload")
    getPayload(
        @ParamAuthManager() authManager: AuthManager,
    ): AuthPayload {
        const payloadHandler = new GenereatePayloadHandler(authManager)
        const payload = payloadHandler.execute(new GenereatePayload())

        return payload
    }

    @Post("login")
    loginUser(
        @ParamAuthUserRepo() userRepo: UserRepo,
        @ParamAuthManager() authManager: AuthManager,
        @ParamJwtManager() jwtManager: JwtManager,
        @ParamUnitOfWork() uow: UnitOfWork,
        @Body("payloadNonce") payloadNonce?: string,
        @Body("address") address?: TonAddress,
        @Body("network") network?: TonNetwork,
        @Body("signature") signature?: string,
    ): Promise<AuthToken> {
        if (!address) {
            throw new BadRequestException("Address is required")
        } else if (!network) {
            throw new BadRequestException("Network is required")
        } else if (network !== TonNetwork.Mainnet && network !== TonNetwork.Testnet) {
            throw new BadRequestException("Network is invalid. Must be -3 or -239")
        } else if (!signature) {
            throw new BadRequestException("Signature is required")
        } else if (!payloadNonce) {
            throw new BadRequestException("Payload nonce is required")
        }

        const payload = new AuthPayload(payloadNonce)

        const proof = new Proof(signature, payload.nonce)
        const tokenHandler = new VerifyProofHandler(authManager, jwtManager, userRepo, uow)
        const token = tokenHandler.execute(new VerifyProof(address, network, proof))

        return token
    }
}
