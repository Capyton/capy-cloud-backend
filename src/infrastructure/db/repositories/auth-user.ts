import { QueryRunner } from "typeorm"
import { TonAddress } from "@src/domain/user/types"
import { User } from "@src/domain/user/entities"
import { UserAddressNotFound } from "@src/application/user/exceptions"
import { User as UserModel } from "@src/infrastructure/db/models"
import { UserRepo } from "@src/application/auth/interfaces"

export class UserRepoImpl implements UserRepo {
    constructor(private readonly queryRunner: QueryRunner) { }

    async getUserByAddress(address: TonAddress): Promise<User> {
        const user = await this.queryRunner.manager.findOne(UserModel, { where: { address: address } })
        if (!user) {
            throw new UserAddressNotFound()
        }
        return user
    }

    async addUser(user: User): Promise<void> {
        await this.queryRunner.manager.insert(UserModel, user)
    }
}
