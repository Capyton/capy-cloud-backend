import { ProviderAddress } from "./types"
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
    ): Provider {
        return new Provider(id, address, maxContracts, maxTotalSize, new Date())
    }
}
