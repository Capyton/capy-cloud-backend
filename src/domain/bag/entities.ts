import { BagId } from "./types"
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
    ): Bag {
        return new Bag(id, bagId, description, size, isUploaded, new Date())
    }
}
