import { UUID } from "@src/utils/uuid"

export class ProviderBag {
    constructor(
        readonly id: UUID,
        readonly providerId: UUID,
        readonly bagId: UUID,
    ) { }

    static create(
        id: UUID,
        providerId: UUID,
        bagId: UUID,
    ) {
        return new ProviderBag(id, providerId, bagId)
    }
}
