import { Provider as ProviderDTO } from "@src/application/provider/dto/provider"
import { UUID } from "@src/domain/common/types"
import { Provider } from "@src/domain/provider/entities"
import { ProviderAddress } from "@src/domain/provider/types"


export interface ProviderRepo {
  acquireProviderById(id: UUID): Promise<Provider>
}

export interface ProviderReader {
  getProviderById(id: UUID): Promise<ProviderDTO>
  getProviderByAddress(address: ProviderAddress): Promise<ProviderDTO>

  getProviders(): Promise<ProviderDTO[]>
}
