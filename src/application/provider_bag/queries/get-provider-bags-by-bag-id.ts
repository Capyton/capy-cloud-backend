import { ProviderBag } from "@src/application/provider_bag/dto/provider-bag"
import { ProviderBagReader } from "@src/application/provider_bag/interfaces/persistence"
import { UUID } from "@src/utils/uuid"

export class GetProviderBagsByProviderId {
    constructor(
        readonly id: UUID,
    ) { }
}

export class GetProviderBagsByProviderIdHandler {
    constructor(
        readonly providerBagReader: ProviderBagReader,
    ) { }

    execute(command: GetProviderBagsByProviderId): Promise<ProviderBag[]> {
        return this.providerBagReader.getProviderBagsByProviderId(command.id)
    }
}
