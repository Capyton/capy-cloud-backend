import { TonAddress } from "@src/domain/user/types"
import { User } from "@src/application/user/dto"
import { UserReader } from "@src/application/user/interfaces/persistence"

export class GetUserByAddress {
    constructor(
        readonly address: TonAddress,
    ) { }
}

export class GetUserByAddressHandler {
    constructor(
        readonly userReader: UserReader,
    ) { }

    execute(command: GetUserByAddress): Promise<User> {
        return this.userReader.getUserByAddress(command.address)
    }
}
