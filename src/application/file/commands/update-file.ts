import { FileRepo } from "@src/application/file/interfaces/persistence"
import { UUID } from "@src/domain/common/types"
import { File } from "@src/domain/file/entities"

export class UpdateFileData {
  constructor(
    readonly description: string | undefined = undefined,
    readonly isCached: boolean | undefined = undefined,
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
  ) { }

  async execute(command: UpdateFile): Promise<void> {
    const file = await this.fileRepo.acquireFileById(command.id)
    const updated_file = File.create(
      file.id,
      file.filename,
      (command.fileData.description != null) ? command.fileData.description : file.description,
      file.size,
      (command.fileData.isCached != null) ? command.fileData.isCached : file.isCached,
    )

    await this.fileRepo.updateFile(updated_file)
  }
}