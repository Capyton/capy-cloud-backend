import { UUID } from "@src/domain/common/types"
import { TonAddress } from "@src/domain/user/types"


export class User {
    constructor(
        readonly id: UUID,
        readonly address: TonAddress,
        readonly registeredAt: Date,
    ) { }

    static create(id: UUID, address: TonAddress, registeredAt: Date): User {
        return new User(id, address, registeredAt)
    }
}
