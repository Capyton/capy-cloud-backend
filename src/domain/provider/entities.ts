import { UUID } from "@src/domain/common/types"
import { ProviderAddress } from "./types"


export class Provider {
    constructor(
        readonly id: UUID,
        readonly address: ProviderAddress,
        readonly max_contracts: number | null,
        readonly max_total_size: number | null,
        readonly createdAt: Date,
    ) { }

    static create(
        id: UUID,
        address: ProviderAddress,
        max_contracts: number | null,
        max_total_size: number | null,
    ): Provider {
        return new Provider(id, address, max_contracts, max_total_size, new Date())
    }
}
