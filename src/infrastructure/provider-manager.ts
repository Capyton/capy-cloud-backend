import { GetProviderParamsByAddressError, NewContractMessageError } from "@src/application/provider/exceptions"

import { BagId } from "@src/domain/bag/types"
import { NewContractMessageResponse } from "@src/application/provider/dto"
import { ProviderAddress } from "@src/domain/provider/types"
import { ProviderManager } from "@src/application/provider/interfaces"
import { ProviderParams } from "@src/application/provider/dto"
import TonstorageCLI from "tonstorage-cli"

export class ProviderManagerImpl implements ProviderManager {
    constructor(private readonly storageDaemonCLI: TonstorageCLI) { }

    async getProviderParamsByAddress(address: ProviderAddress): Promise<ProviderParams> {
        const params = await this.storageDaemonCLI.getProviderParams(address)
        if (!params.ok) {
            throw new GetProviderParamsByAddressError(`Get provider params by address error: \`${params.error}\``)
        }

        const paramsResult = params.result as Record<string, unknown>
        const acceptNewContracts = paramsResult.accept_new_contracts as boolean
        const ratePerMbDay = paramsResult.rate_per_mb_day as number | string
        const maxSpan = paramsResult.max_span as number
        const minFileSize = paramsResult.minimal_file_size as number | string
        const maxFileSize = paramsResult.maximal_file_size as number | string

        return ProviderParams.create(
            acceptNewContracts,
            typeof ratePerMbDay === "string" ? parseInt(ratePerMbDay) : ratePerMbDay,
            maxSpan,
            typeof minFileSize === "string" ? parseInt(minFileSize) : minFileSize,
            typeof maxFileSize === "string" ? parseInt(maxFileSize) : maxFileSize,
        )
    }

    async newContractMessage(bagId: BagId, queryId: number, providerAddress: ProviderAddress): Promise<NewContractMessageResponse> {
        const contractMessage = await this.storageDaemonCLI.newContractMessage(bagId, queryId, providerAddress)
        if (!contractMessage.ok) {
            throw new NewContractMessageError(`New contract message error: \`${contractMessage.error}\``)
        }

        const contractMessageResult = contractMessage.result as Record<string, unknown>
        const payload = contractMessageResult.payload as string
        const ratePerMbDay = contractMessageResult.rate as number | null
        const maxSpan = contractMessageResult.maxSpan as number | null

        return NewContractMessageResponse.create(payload, ratePerMbDay, maxSpan)
    }
}
