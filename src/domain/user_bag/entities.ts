import { UUID } from "@src/utils/uuid"

export class UserBag {
    constructor(
        readonly id: UUID,
        readonly userId: UUID,
        readonly bagId: UUID,
    ) { }

    static create(
        id: UUID,
        userId: UUID,
        bagId: UUID,
    ) {
        return new UserBag(id, userId, bagId)
    }
}
