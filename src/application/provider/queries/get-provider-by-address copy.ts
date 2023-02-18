import { Provider } from "@src/application/provider/dto/provider"
import { ProviderReader } from "@src/application/provider/interfaces/persistence"
import { ProviderAddress } from "@src/domain/provider/types"

export class GetProviderByAddress {
    constructor(
        readonly address: ProviderAddress,
    ) { }
}

export class GetProviderByAddressHandler {
    constructor(
        readonly providerReader: ProviderReader,
    ) { }

    async execute(command: GetProviderByAddress): Promise<Provider> {
        return await this.providerReader.getProviderByAddress(command.address)
    }
}
