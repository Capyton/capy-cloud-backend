import { BagRepo } from "@src/application/bag/interfaces/persistence"
import { Bag } from "@src/domain/bag/entities"
import { BagId } from "@src/domain/bag/types"
import { UUID } from "@src/domain/common/types"

export class CreateBag {
  constructor(
    readonly id: UUID,
    readonly bagId: BagId,
    readonly description: string | null,
    readonly size: number,
    readonly isUploaded: boolean,
  ) { }
}

export class CreateBagHandler {
  constructor(
    readonly bagRepo: BagRepo,
  ) { }

  async execute(command: CreateBag): Promise<void> {
    const bag = Bag.create(
      command.id, command.bagId, command.description,
      command.size, command.isUploaded,
    )
    await this.bagRepo.addBag(bag)
  }
}
