import { Provider } from "@src/application/provider/dto/provider"
import { ProviderReader } from "@src/application/provider/interfaces/persistence"

export class GetProvidersHandler {
    constructor(
        readonly providerReader: ProviderReader,
    ) { }

    async execute(): Promise<Provider[]> {
        return await this.providerReader.getProviders()
    }
}
