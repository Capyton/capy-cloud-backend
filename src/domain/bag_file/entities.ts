import { UUID } from "@src/domain/common/types"


export class BagFile {
    constructor(
        readonly id: UUID,
        readonly bagId: UUID,
        readonly fileId: UUID,
    ) { }

    static create(
        id: UUID,
        bagId: UUID,
        fileId: UUID,
    ) {
        return new BagFile(id, bagId, fileId)
    }
}
