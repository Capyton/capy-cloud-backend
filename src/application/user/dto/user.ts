import { TonAddress } from "@src/domain/user/types"
import { UUID } from "@src/utils/uuid"

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
