import { AuthSession } from "@src/domain/auth-session/entities"
import { AuthSessionByRefreshTokenNotFound } from "@src/application/auth/exceptions"
import { AuthSession as AuthSessionModel } from "@src/infrastructure/db/models"
import { AuthSessionRepo } from "@src/application/auth/interfaces/persistence"
import { QueryRunner } from "typeorm"
import { RefreshToken } from "@src/domain/auth-session/value_objects"


export class AuthSessionRepoImpl implements AuthSessionRepo {
    constructor(private readonly queryRunner: QueryRunner) { }

    async acquireAuthSessionByRefreshToken(refreshToken: string): Promise<AuthSession> {
        const authSession = await this.queryRunner.manager
            .getRepository(AuthSessionModel)
            .createQueryBuilder("authSession")
            .setLock("pessimistic_write")  // SELECT ... FOR UPDATE
            .where({ refreshToken })
            .limit(1)
            .getOne()

        if (!authSession) {
            throw new AuthSessionByRefreshTokenNotFound()
        }
    
        const token = new RefreshToken(authSession.refreshToken, authSession.expiresAt)
        return new AuthSession(authSession.id, authSession.userId, token)
    }

    async updateAuthSession(authSession: AuthSession): Promise<void> {
        await this.queryRunner.manager.update(AuthSessionModel, authSession.id, {
            refreshToken: authSession.refreshToken.token,
            expiresAt: authSession.refreshToken.expiresAt,
        })
    }

    async addAuthSession(authSession: AuthSession): Promise<void> {
        await this.queryRunner.manager.insert(AuthSessionModel, {
            id: authSession.id,
            userId: authSession.userId,
            refreshToken: authSession.refreshToken.token,
            expiresAt: authSession.refreshToken.expiresAt,
        })
    }
}
