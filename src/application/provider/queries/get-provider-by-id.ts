import { Provider } from "@src/application/provider/dto/provider"
import { ProviderReader } from "@src/application/provider/interfaces/persistence"
import { UUID } from "@src/domain/common/types"

export class GetProviderById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class GetProviderByIdHandler {
    constructor(
        readonly providerReader: ProviderReader,
    ) { }

    async execute(command: GetProviderById): Promise<Provider> {
        return await this.providerReader.getProviderById(command.id)
    }
}
