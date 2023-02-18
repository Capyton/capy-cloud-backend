import { ProviderBagRepo } from "@src/application/provider_bag/interfaces/persistence"
import { UUID } from "@src/domain/common/types"
import { ProviderBag } from "@src/domain/provider_bag/entities"

export class AcquireProviderBagById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class AcquireProviderBagByIdHandler {
    constructor(
        readonly providerBagRepo: ProviderBagRepo,
    ) { }

    async execute(command: AcquireProviderBagById): Promise<ProviderBag> {
        return await this.providerBagRepo.acquireProviderBagById(command.id)
    }
}
