import { UUID } from "@src/utils/uuid"


export class File {
    constructor(
        readonly id: UUID,
        readonly bagId: UUID,
        readonly filename: string,
        readonly description: string | null,
        readonly pathDir: string,
        readonly size: number,
        readonly createdAt: Date,
    ) { }

    static create(
        id: UUID,
        bagId: UUID,
        filename: string,
        description: string | null,
        pathDir: string,
        size: number,
        createdAt: Date,
    ): File {
        return new File(id, bagId, filename, description, pathDir, size, createdAt)
    }
}
