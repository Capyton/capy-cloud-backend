import { FileRepo } from "@src/application/file/interfaces/persistence"
import { UUID } from "@src/domain/common/types"
import { File } from "@src/domain/file/entities"

export class CreateFile {
  constructor(
    readonly id: UUID,
    readonly bag_id: UUID,
    readonly filename: string,
    readonly pathDir: string,
    readonly description: string | null,
    readonly size: number,
  ) { }
}

export class CreateFileHandler {
  constructor(
    readonly fileRepo: FileRepo,
  ) { }

  async execute(command: CreateFile): Promise<void> {
    const file = File.create(
      command.id, command.bag_id, command.filename, command.description,
      command.pathDir, command.size,
    )
    await this.fileRepo.addFile(file)
  }
}
