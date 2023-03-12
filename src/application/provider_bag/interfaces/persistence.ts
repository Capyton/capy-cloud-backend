import { ProviderBag } from "@src/domain/provider_bag/entities"
import { ProviderBag as ProviderBagDTO } from "@src/application/provider_bag/dto/provider-bag"
import { UUID } from "@src/utils/uuid"

export interface ProviderBagRepo {
  addProviderBag(providerBag: ProviderBag): Promise<void>
  deleteProviderBagById(id: UUID): Promise<void>
  deleteProviderBagsByProviderId(providerId: UUID): Promise<void>
}

export interface ProviderBagReader {
  getProviderBagById(id: UUID): Promise<ProviderBagDTO>
  getProviderBagsByProviderId(providerId: UUID): Promise<ProviderBagDTO[]>
}
