import { ProviderBagRepo } from "@src/application/provider_bag/interfaces/persistence"
import { UUID } from "@src/domain/common/types"
import { ProviderBag } from "@src/domain/provider_bag/entities"

export class CreateProviderBag {
  constructor(
    readonly id: UUID,
    readonly providerId: UUID,
    readonly bagId: UUID,
  ) { }
}

export class CreateProviderBagHandler {
  constructor(
    readonly providerBagRepo: ProviderBagRepo,
  ) { }

  async execute(command: CreateProviderBag): Promise<void> {
    const providerBag = ProviderBag.create(
      command.id, command.providerId, command.bagId
    )
    await this.providerBagRepo.addProviderBag(providerBag)
  }
}
