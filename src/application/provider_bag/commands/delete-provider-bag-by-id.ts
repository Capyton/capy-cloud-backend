import { UnitOfWork } from "@src/application/common/interfaces"
import { ProviderBagRepo } from "@src/application/provider_bag/interfaces/persistence"
import { UUID } from "@src/utils/uuid"

export class DeleteProviderBagById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class DeleteProviderBagByIdHandler {
    constructor(
        readonly providerBagRepo: ProviderBagRepo,
        readonly uow: UnitOfWork,
    ) { }

    async execute(command: DeleteProviderBagById): Promise<void> {
        await this.providerBagRepo.deleteProviderBagById(command.id)
        await this.uow.commit()
    }
}
