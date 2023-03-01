import { Controller, Post } from "@nestjs/common"
import {
    AuthManager as ParamAuthManager,
    AuthUserRepo as ParamAuthUserRepo,
    JwtManager as ParamJwtManager,
    UnitOfWork as ParamUnitOfWork,
} from "@src/api/param_decorators"
import { GenereatePayload, GenereatePayloadHandler } from "@src/application/auth/commands/generate-payload"
import { Proof, VerifyProof, VerifyProofHandler } from "@src/application/auth/commands/verify-proof"
import { AuthToken } from "@src/application/auth/dto"
import { AuthManager, JwtManager, UserRepo } from "@src/application/auth/interfaces"
import { UnitOfWork } from "@src/application/common/interfaces"
import { TonNetwork } from "@src/domain/user/types"

@Controller("auth")
export class AuthController {
    @Post("login")
    async loginUser(
        @ParamAuthUserRepo() userRepo: UserRepo,
        @ParamAuthManager() authManager: AuthManager,
        @ParamJwtManager() jwtManager: JwtManager,
        @ParamUnitOfWork() uow: UnitOfWork,
    ): Promise<AuthToken> {
        const payloadHandler = new GenereatePayloadHandler(authManager)
        const payload = await payloadHandler.execute(new GenereatePayload())

        // Test variables, should be taken from wallet SDK
        const signatute = "test"
        const address = "test"
        const network = TonNetwork.Testnet
        // End of test variables

        const proof = new Proof(signatute, payload.nonce)
        const tokenHandler = new VerifyProofHandler(authManager, jwtManager, userRepo, uow)
        const token = await tokenHandler.execute(new VerifyProof(address, network, proof))

        return token
    }
}
