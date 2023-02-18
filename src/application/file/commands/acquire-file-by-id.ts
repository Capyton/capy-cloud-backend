import { FileRepo } from "@src/application/file/interfaces/persistence"
import { UUID } from "@src/domain/common/types"
import { File } from "@src/domain/file/entities"

export class AcquireFileById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class AcquireFileByIdHandler {
    constructor(
        readonly fileRepo: FileRepo,
    ) { }

    async execute(command: AcquireFileById): Promise<File> {
        return await this.fileRepo.acquireFileById(command.id)
    }
}
