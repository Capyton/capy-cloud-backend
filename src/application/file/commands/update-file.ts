import { File } from "@src/domain/file/entities"
import { FileRepo } from "@src/application/file/interfaces/persistence"
import { UUID } from "@src/utils/uuid"
import { UnitOfWork } from "@src/application/common/interfaces"

export class UpdateFileData {
    constructor(
        readonly description: string | undefined = undefined,
    ) { }
}

export class UpdateFile {
    constructor(
        readonly id: UUID,
        readonly fileData: UpdateFileData,
    ) { }
}

export class UpdateFileHandler {
    constructor(
        readonly fileRepo: FileRepo,
        readonly uow: UnitOfWork,
    ) { }

    async execute(command: UpdateFile): Promise<void> {
        const file = await this.fileRepo.getFileById(command.id)

        await this.fileRepo.updateFile(new File(
            file.id,
            file.bagId,
            file.filename,
            (command.fileData.description != null) ? command.fileData.description : file.description,
            file.pathDir,
            file.size,
            file.createdAt,
        ))
        await this.uow.commit()
    }
}
