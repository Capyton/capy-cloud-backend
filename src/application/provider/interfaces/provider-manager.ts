import { BagId } from "@src/domain/bag/types"
import { NewContractMessageResponse } from "@src/application/provider/dto"
import { ProviderAddress } from "@src/domain/provider/types"
import { ProviderParams } from "@src/application/provider/dto"

export interface ProviderManager {
    getProviderParamsByAddress(address: ProviderAddress): Promise<ProviderParams>
    newContractMessage(bagId: BagId, queryId: number, providerAddress: ProviderAddress): Promise<NewContractMessageResponse>
}
