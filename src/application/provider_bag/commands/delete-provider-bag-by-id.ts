import { ProviderBagRepo } from "@src/application/provider_bag/interfaces/persistence"
import { UUID } from "@src/domain/common/types"

export class DeleteProviderBagById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class DeleteProviderBagByIdHandler {
    constructor(
        readonly providerBagRepo: ProviderBagRepo,
    ) { }

    async execute(command: DeleteProviderBagById): Promise<void> {
        await this.providerBagRepo.deleteProviderBagById(command.id)
    }
}
