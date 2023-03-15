import { BagId } from "@src/domain/bag/types"
import { NewContractMessageResponse } from "@src/application/provider/dto/provider"
import { ProviderAddress } from "@src/domain/provider/types"
import { ProviderManager } from "@src/application/provider/interfaces"

export class NewContractMessage {
    constructor(
        readonly bagId: BagId,
        readonly queryId: number,
        readonly providerAddress: ProviderAddress,
    ) { }
}

export class NewContractMessageHandler {
    constructor(
        readonly providerManager: ProviderManager,
    ) { }

    execute(command: NewContractMessage): Promise<NewContractMessageResponse> {
        return this.providerManager.newContractMessage(
            command.bagId, command.queryId, command.providerAddress,
        )
    }
}
