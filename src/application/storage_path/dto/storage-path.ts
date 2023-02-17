import { UUID } from "@src/domain/common/types"


export class StoragePath {
    constructor(
        readonly id: UUID,
        readonly file_id: UUID,
        readonly path: string,
    ) { }

    static create(
        id: UUID,
        file_id: UUID,
        path: string,
    ): StoragePath {
        return new StoragePath(id, file_id, path)
    }
}
