import { Provider } from "@src/application/provider/dto/provider"
import { ProviderReader } from "@src/application/provider/interfaces/persistence"

export class GetProviders { }

export class GetProvidersHandler {
    constructor(
        readonly providerReader: ProviderReader,
    ) { }

    execute(_command: GetProviders): Promise<Provider[]> {
        return this.providerReader.getProviders()
    }
}
