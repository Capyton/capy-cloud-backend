import { Provider } from "@src/domain/provider/entities"
import { ProviderAddress } from "@src/domain/provider/types"
import { Provider as ProviderDTO } from "@src/application/provider/dto/provider"
import { UUID } from "@src/utils/uuid"

export interface ProviderRepo {
    getProviderById(id: UUID): Promise<Provider>
    addProvider(provider: Provider): Promise<void>
    deleteProviderById(id: UUID): Promise<void>
    deleteProviderByAddress(address: ProviderAddress): Promise<void>
    updateProvider(provider: Provider): Promise<void>
}

export interface ProviderReader {
    getProviderById(id: UUID): Promise<ProviderDTO>
    getProviderByAddress(address: ProviderAddress): Promise<ProviderDTO>
    getProviders(): Promise<ProviderDTO[]>
}
