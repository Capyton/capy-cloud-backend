import { BagId } from "@src/domain/bag/types"
import { UUID } from "@src/utils/uuid"

export class Bag {
    constructor(
        readonly id: UUID,
        readonly bagId: BagId,
        readonly description: string | null,
        readonly size: number,
        readonly isUploaded: boolean,
        readonly createdAt: Date,
    ) { }

    static create(
        id: UUID,
        bagId: BagId,
        description: string | null,
        size: number,
        isUploaded: boolean,
        createdAt: Date,
    ): Bag {
        return new Bag(id, bagId, description, size, isUploaded, createdAt)
    }
}
