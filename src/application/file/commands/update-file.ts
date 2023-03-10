import { UnitOfWork } from "@src/application/common/interfaces"
import { FileRepo } from "@src/application/file/interfaces/persistence"
import { File } from "@src/domain/file/entities"
import { UUID } from "@src/utils/uuid"

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
    const updated_file = File.create(
      file.id,
      file.bagId,
      file.filename,
      (command.fileData.description != null) ? command.fileData.description : file.description,
      file.pathDir,
      file.size,
    )
    await this.fileRepo.updateFile(updated_file)
    await this.uow.commit()
  }
}
