import { Provider as ProviderDTO } from "@src/application/provider/dto/provider"
import { UUID } from "@src/utils/uuid"
import { ProviderAddress } from "@src/domain/provider/types"


export interface ProviderRepo { }

export interface ProviderReader {
  getProviderById(id: UUID): Promise<ProviderDTO>
  getProviderByAddress(address: ProviderAddress): Promise<ProviderDTO>

  getProviders(): Promise<ProviderDTO[]>
}
