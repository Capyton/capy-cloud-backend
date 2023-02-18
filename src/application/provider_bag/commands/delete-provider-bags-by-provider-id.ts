import { ProviderBagRepo } from "@src/application/provider_bag/interfaces/persistence"
import { UUID } from "@src/domain/common/types"

export class DeleteProviderBagsByProviderId {
    constructor(
        readonly id: UUID,
    ) { }
}

export class DeleteProviderBagsByProviderIdHandler {
    constructor(
        readonly providerBagRepo: ProviderBagRepo,
    ) { }

    async execute(command: DeleteProviderBagsByProviderId): Promise<void> {
        await this.providerBagRepo.deleteProviderBagsByProviderId(command.id)
    }
}
