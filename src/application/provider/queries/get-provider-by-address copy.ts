import { Provider } from "@src/application/provider/dto/provider"
import { ProviderAddress } from "@src/domain/provider/types"
import { ProviderReader } from "@src/application/provider/interfaces/persistence"

export class GetProviderByAddress {
    constructor(
        readonly address: ProviderAddress,
    ) { }
}

export class GetProviderByAddressHandler {
    constructor(
        readonly providerReader: ProviderReader,
    ) { }

    execute(command: GetProviderByAddress): Promise<Provider> {
        return this.providerReader.getProviderByAddress(command.address)
    }
}
