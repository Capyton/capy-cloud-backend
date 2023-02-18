import { ProviderRepo } from "@src/application/provider/interfaces/persistence"
import { UUID } from "@src/domain/common/types"
import { Provider } from "@src/domain/provider/entities"

export class AcquireProviderById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class AcquireProviderByIdHandler {
    constructor(
        readonly providerRepo: ProviderRepo,
    ) { }

    async execute(command: AcquireProviderById): Promise<Provider> {
        return await this.providerRepo.acquireProviderById(command.id)
    }
}
