import { BagRepo } from "@src/application/bag/interfaces/persistence"
import { UnitOfWork } from "@src/application/common/interfaces"
import { Bag } from "@src/domain/bag/entities"
import { UUID } from "@src/utils/uuid"

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
    readonly uow: UnitOfWork,
  ) { }

  async execute(command: UpdateBag): Promise<void> {
    const bag = await this.bagRepo.getBagById(command.id)
    const updatedBag = Bag.create(
      bag.id,
      bag.bagId,
      bag.description,
      bag.size,
      (command.bagData.isUploaded != null) ? command.bagData.isUploaded : bag.isUploaded,
    )
    await this.bagRepo.updateBad(updatedBag)
    await this.uow.commit()
  }
}
