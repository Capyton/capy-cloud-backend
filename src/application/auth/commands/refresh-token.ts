import * as dto from "@src/application/auth/dto"
import { AuthSessionRepo, UserRepo } from "@src/application/auth/interfaces/persistence"
import { JwtManager } from "@src/application/auth/interfaces"
import { UnitOfWork } from "@src/application/common/interfaces"


export class RefreshToken {
    constructor(
        readonly refreshToken: string,
    ) { }
}

export class RefreshTokenHandler {
    constructor(
        private readonly userRepo: UserRepo,
        private readonly authSessionRepo: AuthSessionRepo,
        private readonly jwtManager: JwtManager,
        private readonly uow: UnitOfWork,
    ) { }

    async execute(command: RefreshToken): Promise<dto.AuthTokens> {
        this.jwtManager.validateToken(command.refreshToken)

        const authSession = await this.authSessionRepo.acquireAuthSessionByRefreshToken(command.refreshToken)
        const user = await this.userRepo.getUserById(authSession.userId)
    
        const userPayload = new dto.UserPayload(user.id, user.address)
        const newAccessToken = this.jwtManager.generateAccessToken(userPayload)
        const newRefreshToken = this.jwtManager.generateRefreshToken(userPayload)
        authSession.refresh(newRefreshToken)

        await this.authSessionRepo.updateAuthSession(authSession)
        await this.uow.commit()

        return new dto.AuthTokens(newAccessToken, newRefreshToken.token)
    }
}
