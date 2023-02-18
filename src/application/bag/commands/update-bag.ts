import { BagRepo } from "@src/application/bag/interfaces/persistence"
import { Bag } from "@src/domain/bag/entities"
import { UUID } from "@src/domain/common/types"

export class UpdateBagData {
  constructor(
    readonly isUploaded: boolean | undefined = undefined,
  ) { }
}

export class UpdateBag {
  constructor(
    readonly id: UUID,
    readonly bagData: UpdateBagData,
  ) { }
}

export class UpdateBagHandler {
  constructor(
    readonly bagRepo: BagRepo,
  ) { }

  async execute(command: UpdateBag): Promise<void> {
    const bag = await this.bagRepo.acquireBagById(command.id)
    const updated_bag = Bag.create(
      bag.id,
      bag.bagId,
      bag.description,
      bag.size,
      (command.bagData.isUploaded != null) ? command.bagData.isUploaded : bag.isUploaded,
    )

    await this.bagRepo.updateBad(updated_bag)
  }
}
