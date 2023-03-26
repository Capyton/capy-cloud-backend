import { QueryRunner } from "typeorm"
import { RefreshToken } from "@src/domain/refresh-token/entities"
import { RefreshToken as RefreshTokenModel } from "@src/infrastructure/db/models"
import { RefreshTokenRepo } from "@src/application/auth/interfaces/persistence"


export class RefreshTokenRepoImpl implements RefreshTokenRepo {
    constructor(private readonly queryRunner: QueryRunner) { }

    // async getRefreshTokenByAddress(address: TonAddress): Promise<RefreshToken> {
    //     const user = await this.queryRunner.manager.findOne(RefreshTokenModel, { where: { address: address } })
    //     if (!user) {
    //         throw new RefreshTokenAddressNotFound()
    //     }
    //     return user
    // }

    async addRefreshToken(refreshToken: RefreshToken): Promise<void> {
        await this.queryRunner.manager.insert(RefreshTokenModel, refreshToken)
    }
}
