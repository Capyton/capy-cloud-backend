import { BagRepo } from "@src/application/bag/interfaces/persistence"
import { Bag } from "@src/domain/bag/entities"
import { UUID } from "@src/domain/common/types"

export class UpdateBagData {
  constructor(
    readonly is_uploaded: boolean | undefined = undefined,
    readonly is_cached: boolean | undefined = undefined,
  ) { }
}

export class UpdateBag {
  constructor(
    readonly id: UUID,
    readonly bag_data: UpdateBagData,
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
      (command.bag_data.is_uploaded != null) ? command.bag_data.is_uploaded : bag.is_uploaded,
      (command.bag_data.is_cached != null) ? command.bag_data.is_cached : bag.is_cached,
    )

    await this.bagRepo.updateBad(updated_bag)
  }
}
