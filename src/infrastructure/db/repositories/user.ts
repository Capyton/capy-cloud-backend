import { User as UserDTO } from "@src/application/user/dto"
import { UserAddressNotFound } from "@src/application/user/exceptions"
import { UserReader, UserRepo } from "@src/application/user/interfaces"
import { User } from "@src/domain/user/entities"
import { TonAddress } from "@src/domain/user/types"
import { User as UserModel } from "@src/infrastructure/db/models"
import { UUID } from "@src/utils/uuid"
import { QueryRunner } from "typeorm"

export class UserRepoImpl implements UserRepo {
    constructor(private readonly queryRunner: QueryRunner) { }

    async getUserById(id: UUID): Promise<User> {
        const user = await this.queryRunner.manager.findOne(UserModel, { where: { id: id } })
        if (!user) {
            throw new UserAddressNotFound(`User with id ${id} not found`)
        }
        return user
    }

    async addUser(user: User): Promise<void> {
        await this.queryRunner.manager.insert(UserModel, user)
    }

    async deleteUserById(id: UUID): Promise<void> {
        await this.queryRunner.manager.delete(UserModel, { where: { id: id } })
    }

    async deleteUserByAddress(address: TonAddress): Promise<void> {
        await this.queryRunner.manager.delete(UserModel, { where: { address: address } })
    }
}

export class UserReaderImpl implements UserReader {
    constructor(private readonly queryRunner: QueryRunner) { }

    async getUserById(id: UUID): Promise<UserDTO> {
        const user = await this.queryRunner.manager.findOne(UserModel, { where: { id: id } })
        if (!user) {
            throw new UserAddressNotFound(`User with id ${id} not found`)
        }
        return user
    }

    async getUserByAddress(address: TonAddress): Promise<UserDTO> {
        const user = await this.queryRunner.manager.findOne(UserModel, { where: { address: address } })
        if (!user) {
            throw new UserAddressNotFound(`User with address ${address} not found`)
        }
        return user
    }
}
