import { FileRepo } from "@src/application/file/interfaces/persistence"
import { UUID } from "@src/domain/common/types"
import { File } from "@src/domain/file/entities"

export class CreateFile {
  constructor(
    readonly id: UUID,
    readonly filename: string,
    readonly description: string | null,
    readonly size: number,
    readonly is_cached: boolean,
  ) { }
}

export class CreateFileHandler {
  constructor(
    readonly fileRepo: FileRepo,
  ) { }

  async execute(command: CreateFile): Promise<void> {
    const file = File.create(
      command.id, command.filename, command.description,
      command.size, command.is_cached,
    )
    await this.fileRepo.addFile(file)
  }
}
