import { UserBag as UserBagDTO } from "@src/application/user_bag/dto"
import { UserBagIdNotFound } from "@src/application/user_bag/exceptions"
import { UserBagReader, UserBagRepo } from "@src/application/user_bag/interfaces"
import { UserBag } from "@src/domain/user_bag/entities"
import { UserBag as UserBagModel } from "@src/infrastructure/db/models"
import { QueryRunner } from "typeorm"

export class UserBagRepoImpl implements UserBagRepo {
    constructor(private readonly queryRunner: QueryRunner) { }

    async addUserBag(userBag: UserBag): Promise<void> {
        await this.queryRunner.manager.insert(UserBagModel, userBag)
    }

    async deleteUserBagById(id: string): Promise<void> {
        await this.queryRunner.manager.delete(UserBagModel, { where: { id: id } })
    }

    async deleteUserBagsByUserId(userId: string): Promise<void> {
        await this.queryRunner.manager.delete(UserBagModel, { where: { userId: userId } })
    }
}

export class UserBagReaderImpl implements UserBagReader {
    constructor(private readonly queryRunner: QueryRunner) { }

    async getUserBagById(id: string): Promise<UserBagDTO> {
        const userBag = await this.queryRunner.manager.findOne(UserBagModel, { where: { id: id } })
        if (!userBag) {
            throw new UserBagIdNotFound()
        }
        return userBag
    }

    async getUserBagsByUserId(userId: string): Promise<UserBagDTO[]> {
        return await this.queryRunner.manager.find(UserBagModel, { where: { userId: userId } })
    }
}
