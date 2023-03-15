import { ProviderAddress } from "@src/domain/provider/types"
import { ProviderManager } from "@src/application/provider/interfaces"
import { ProviderParams } from "@src/application/provider/dto/provider"

export class GetProviderParamsByAddress {
    constructor(
        readonly address: ProviderAddress,
    ) { }
}

export class GetProviderParamsByAddressHandler {
    constructor(
        readonly providerManager: ProviderManager,
    ) { }

    execute(command: GetProviderParamsByAddress): Promise<ProviderParams> {
        return this.providerManager.getProviderParamsByAddress(command.address)
    }
}
