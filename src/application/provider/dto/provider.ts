import { ProviderAddress } from "@src/domain/provider/types"
import { UUID } from "@src/utils/uuid"

export class Provider {
    constructor(
        readonly id: UUID,
        readonly address: ProviderAddress,
        readonly maxContracts: number | null,
        readonly maxTotalSize: number | null,
        readonly createdAt: Date,
    ) { }

    static create(
        id: UUID,
        address: ProviderAddress,
        maxContracts: number | null,
        maxTotalSize: number | null,
        createdAt: Date,
    ): Provider {
        return new Provider(id, address, maxContracts, maxTotalSize, createdAt)
    }
}

export class ProviderParams {
    constructor(
        readonly acceptNewContracts: boolean,
        readonly ratePerMbDay: number,
        readonly maxSpan: number,
        readonly minFileSize: number,
        readonly maxFileSize: number,
    ) { }

    static create(
        acceptNewContracts: boolean,
        ratePerMbDay: number,
        maxSpan: number,
        minFileSize: number,
        maxFileSize: number,
    ): ProviderParams {
        return new ProviderParams(acceptNewContracts, ratePerMbDay, maxSpan, minFileSize, maxFileSize)
    }
}

export class NewContractMessageResponse {
    constructor(
        readonly payload: string,
        readonly ratePerMbDay: number | null,
        readonly maxSpan: number | null,
    ) { }

    static create(
        payload: string,
        ratePerMbDay: number | null,
        maxSpan: number | null,
    ): NewContractMessageResponse {
        return new NewContractMessageResponse(payload, ratePerMbDay, maxSpan)
    }
}
