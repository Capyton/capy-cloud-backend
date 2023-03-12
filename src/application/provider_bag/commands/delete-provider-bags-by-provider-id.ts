import { ProviderBagRepo } from "@src/application/provider_bag/interfaces/persistence"
import { UUID } from "@src/utils/uuid"
import { UnitOfWork } from "@src/application/common/interfaces"

export class DeleteProviderBagsByProviderId {
    constructor(
        readonly id: UUID,
    ) { }
}

export class DeleteProviderBagsByProviderIdHandler {
    constructor(
        readonly providerBagRepo: ProviderBagRepo,
        readonly uow: UnitOfWork,
    ) { }

    async execute(command: DeleteProviderBagsByProviderId): Promise<void> {
        await this.providerBagRepo.deleteProviderBagsByProviderId(command.id)
        await this.uow.commit()
    }
}
