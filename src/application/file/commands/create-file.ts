import { File } from "@src/domain/file/entities"
import { FileRepo } from "@src/application/file/interfaces/persistence"
import { UUID } from "@src/utils/uuid"
import { UnitOfWork } from "@src/application/common/interfaces"

export class CreateFile {
    constructor(
        readonly id: UUID,
        readonly bagId: UUID,
        readonly filename: string,
        readonly pathDir: string,
        readonly description: string | null,
        readonly size: number,
    ) { }
}

export class CreateFileHandler {
    constructor(
        readonly fileRepo: FileRepo,
        readonly uow: UnitOfWork,
    ) { }

    async execute(command: CreateFile): Promise<void> {
        const file = File.create(
            command.id, command.bagId, command.filename, command.description,
            command.pathDir, command.size,
        )
        await this.fileRepo.addFile(file)
        await this.uow.commit()
    }
}
