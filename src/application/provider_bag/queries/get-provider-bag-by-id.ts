import { ProviderBag } from "@src/application/provider_bag/dto/provider-bag"
import { ProviderBagReader } from "@src/application/provider_bag/interfaces/persistence"
import { UUID } from "@src/utils/uuid"

export class GetProviderBagById {
    constructor(
        readonly id: UUID,
    ) { }
}

export class GetProviderBagByIdHandler {
    constructor(
        readonly providerBagReader: ProviderBagReader,
    ) { }

    async execute(command: GetProviderBagById): Promise<ProviderBag> {
        return await this.providerBagReader.getProviderBagById(command.id)
    }
}
