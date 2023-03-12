import { Provider } from "@src/application/provider/dto/provider"
import { ProviderReader } from "@src/application/provider/interfaces/persistence"
import { UUID } from "@src/utils/uuid"

export class GetProviderById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class GetProviderByIdHandler {
    constructor(
        readonly providerReader: ProviderReader,
    ) { }

    execute(command: GetProviderById): Promise<Provider> {
        return this.providerReader.getProviderById(command.id)
    }
}
