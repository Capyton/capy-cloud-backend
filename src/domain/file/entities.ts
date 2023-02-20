import { UUID } from "@src/domain/common/types"


export class File {
    constructor(
        readonly id: UUID,
        readonly bag_id: UUID,
        readonly filename: string,
        readonly description: string | null,
        readonly pathDir: string,
        readonly size: number,
        readonly createdAt: Date,
    ) { }

    static create(
        id: UUID,
        bag_id: UUID,
        filename: string,
        description: string | null,
        pathDir: string,
        size: number,
    ): File {
        return new File(id, bag_id, filename, description, pathDir, size, new Date())
    }
}
