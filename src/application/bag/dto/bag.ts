import { BagId } from "@src/domain/bag/types";
import { UUID } from "@src/domain/common/types";

export class Bag {
    constructor(
        readonly id: UUID,
        readonly bagId: BagId,
        readonly description: string | null,
        readonly size: number,
        readonly is_uploaded: boolean,
        readonly is_cached: boolean,
        readonly createdAt: Date,
    ) { }

    static create(
        id: UUID,
        bagId: BagId,
        description: string | null,
        size: number,
        is_uploaded: boolean,
        is_cached: boolean,
        createdAt: Date,
    ): Bag {
        return new Bag(id, bagId, description, size, is_uploaded, is_cached, createdAt)
    }
}
