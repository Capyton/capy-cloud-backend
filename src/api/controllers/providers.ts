import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger"
import { Controller, Get, Param } from "@nestjs/common"
import {
    GetProviderParamsByAddress,
    GetProviderParamsByAddressHandler,
} from "@src/application/provider/queries/get-provider-params-by-address"
import { GetProviders, GetProvidersHandler } from "@src/application/provider/queries/get-providers"
import { NewContractMessage, NewContractMessageHandler } from "@src/application/provider/queries/new-contract-message"
import {
    ProviderManager as ParamProviderManager,
    ProviderReader as ParamProviderReader,
} from "@src/api/param_decorators"
import { Provider, ProviderParams } from "@src/application/provider/dto"
import { ProviderManager, ProviderReader } from "@src/application/provider/interfaces"

import { BagId } from "@src/domain/bag/types"
import { NewContractMessageResponse } from "@src/application/provider/dto/provider"
import { ProviderAddress } from "@src/domain/provider/types"

@ApiTags("Providers")
@Controller("providers")
export class ProviderController {
    /**
     * Get all providers
     * @returns Providers
     */
    @ApiOperation({ summary: "Get all providers" })
    @ApiResponse({
        status: 200,
        description: "Providers",
        schema: {
            nullable: false,
            type: "array",
            items: {
                nullable: false,
                type: "object",
                properties: {
                    id: {
                        nullable: false,
                        title: "Id",
                        type: "string",
                        format: "uuid",
                        description: "Id of the provider",
                    },
                    address: {
                        nullable: false,
                        title: "Address",
                        type: "string",
                        description: "Address of the provider",
                    },
                    maxContracts: {
                        nullable: true,
                        title: "Max contracts",
                        type: "number",
                        description: "Max contracts",
                    },
                    maxTotalSize: {
                        nullable: true,
                        title: "Max total size",
                        type: "number",
                        description: "Max total size",
                    },
                    createdAt: {
                        nullable: false,
                        title: "Created at",
                        type: "string",
                        format: "date-time",
                        description: "Created at",
                    },
                },
            },
        },
    })
    @Get()
    getProvidersAddresses(
        @ParamProviderReader() providerReader: ProviderReader,
    ): Promise<Provider[]> {
        const providersHandler = new GetProvidersHandler(providerReader)
        const providers = providersHandler.execute(new GetProviders())

        return providers
    }

    /**
     * Get provider params by provider address
     * @param providerAddress - Provider address of the provider
     * @returns Provider params
     */
    @ApiOperation({ summary: "Get provider params by provider address" })
    @ApiParam({
        schema: {
            nullable: false,
            title: "Provider address",
            type: "string",
            description: "Address of the provider",
        },
        name: "providerAddress",
    })
    @ApiResponse({
        status: 200,
        description: "Provider params",
        schema: {
            nullable: false,
            type: "object",
            properties: {
                acceptNewContracts: {
                    nullable: false,
                    title: "Accept new contracts",
                    type: "boolean",
                    description: "Whether the provider accepts new contracts",
                },
                ratePerMbDay: {
                    nullable: false,
                    title: "Rate per MB day",
                    type: "number",
                    description: "Rate per MB day",
                },
                maxSpan: {
                    nullable: false,
                    title: "Max span",
                    type: "number",
                    description: "Max span",
                },
                minFileSize: {
                    nullable: false,
                    title: "Min file size",
                    type: "number",
                    description: "Min file size",
                },
                maxFileSize: {
                    nullable: false,
                    title: "Max file size",
                    type: "number",
                    description: "Max file size",
                },
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: "Get provider params by address error",
    })
    @Get("params/:providerAddress")
    getProviderParamsByAddress(
        @ParamProviderManager() providerManager: ProviderManager,
        @Param("providerAddress") providerAddress: ProviderAddress,
    ): Promise<ProviderParams> {
        const providerParamsHandler = new GetProviderParamsByAddressHandler(providerManager)
        const providerParams = providerParamsHandler.execute(new GetProviderParamsByAddress(providerAddress))

        return providerParams
    }

    /**
     * New contract message for a provider
     * @param bagId - Bag id
     * @param providerAddress - Provider address
     */
    @ApiOperation({ summary: "New contract message for a provider" })
    @ApiParam({
        schema: {
            nullable: false,
            title: "Bag id",
            type: "string",
            description: "Bag id",
        },
        name: "bagId",
    })
    @ApiParam({
        schema: {
            nullable: false,
            title: "Provider address",
            type: "string",
            description: "Address of the provider",
        },
        name: "providerAddress",
    })
    @ApiResponse({
        status: 200,
        description: "New contract message response",
        schema: {
            nullable: false,
            type: "object",
            properties: {
                payload: {
                    nullable: false,
                    title: "Payload",
                    type: "string",
                    description: "Payload",
                },
                ratePerMbDay: {
                    nullable: true,
                    title: "Rate per MB day",
                    type: "number",
                    description: "Rate per MB day",
                },
                maxSpan: {
                    nullable: true,
                    title: "Max span",
                    type: "number",
                    description: "Max span",
                },
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: "New contract message error",
    })
    @Get("new-contract-message/:providerAddress/:bagId")
    newContractMessageForProvider(
        @ParamProviderManager() providerManager: ProviderManager,
        @Param("providerAddress") providerAddress: ProviderAddress,
        @Param("bagId") bagId: BagId,
    ): Promise<NewContractMessageResponse> {
        const queryId = 0

        const newContractMessageHandler = new NewContractMessageHandler(providerManager)
        const newContractMessageResponse = newContractMessageHandler
            .execute(new NewContractMessage(bagId, queryId, providerAddress))

        return newContractMessageResponse
    }
}
