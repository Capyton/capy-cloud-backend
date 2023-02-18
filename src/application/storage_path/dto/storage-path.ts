import { UUID } from "@src/domain/common/types"


export class StoragePath {
    constructor(
        readonly id: UUID,
        readonly fileId: UUID,
        readonly path: string,
    ) { }

    static create(
        id: UUID,
        fileId: UUID,
        path: string,
    ): StoragePath {
        return new StoragePath(id, fileId, path)
    }
}
