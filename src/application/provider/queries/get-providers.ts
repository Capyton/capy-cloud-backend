import { Provider } from "@src/application/provider/dto/provider"
import { ProviderReader } from "@src/application/provider/interfaces/persistence"

export class GetProvidersHandler {
    constructor(
        readonly providerReader: ProviderReader,
    ) { }

    execute(): Promise<Provider[]> {
        return this.providerReader.getProviders()
    }
}
