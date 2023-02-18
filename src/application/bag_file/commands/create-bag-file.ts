import { BagFileRepo } from "@src/application/bag_file/interfaces/persistence"
import { BagFile } from "@src/domain/bag_file/entities"
import { UUID } from "@src/domain/common/types"

export class CreateBagFile {
  constructor(
    readonly id: UUID,
    readonly bagId: UUID,
    readonly fileId: UUID,
  ) { }
}

export class CreateBagFileHandler {
  constructor(
    readonly bagFileRepo: BagFileRepo,
  ) { }

  async execute(command: CreateBagFile): Promise<void> {
    const bagFile = BagFile.create(
      command.id, command.bagId, command.fileId,
    )
    await this.bagFileRepo.addBagFile(bagFile)
  }
}
