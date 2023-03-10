import { User } from "@src/application/user/dto"
import { UserReader } from "@src/application/user/interfaces/persistence"
import { TonAddress } from "@src/domain/user/types"

export class GetUserByAddress {
    constructor(
        readonly address: TonAddress,
    ) { }
}

export class GetUserByAddressHandler {
    constructor(
        readonly userReader: UserReader,
    ) { }

    async execute(command: GetUserByAddress): Promise<User> {
        return await this.userReader.getUserByAddress(command.address)
    }
}
