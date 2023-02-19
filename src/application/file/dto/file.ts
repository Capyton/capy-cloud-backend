import { UUID } from "@src/domain/common/types"


export class File {
    constructor(
        readonly id: UUID,
        readonly filename: string,
        readonly description: string | null,
        readonly pathDir: string,
        readonly size: number,
        readonly isCached: boolean,
        readonly createdAt: Date,
    ) { }

    static create(
        id: UUID,
        filename: string,
        description: string | null,
        pathDir: string,
        size: number,
        isCached: boolean,
        createdAt: Date,
    ): File {
        return new File(id, filename, description, pathDir, size, isCached, createdAt)
    }
}
