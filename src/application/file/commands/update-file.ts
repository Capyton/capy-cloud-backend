import { FileRepo } from "@src/application/file/interfaces/persistence"
import { UUID } from "@src/domain/common/types"
import { File } from "@src/domain/file/entities"

export class UpdateFileData {
  constructor(
    readonly description: string | undefined = undefined,
    readonly is_cached: boolean | undefined = undefined,
  ) { }
}

export class UpdateFile {
  constructor(
    readonly id: UUID,
    readonly file_data: UpdateFileData,
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
      (command.file_data.description != null) ? command.file_data.description : file.description,
      file.size,
      (command.file_data.is_cached != null) ? command.file_data.is_cached : file.is_cached,
    )

    await this.fileRepo.updateFile(updated_file)
  }
}
