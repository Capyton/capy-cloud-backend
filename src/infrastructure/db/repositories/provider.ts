import { Provider as ProviderDTO } from "@src/application/provider/dto"
import { ProviderAddressNotFound, ProviderIdNotFound } from "@src/application/provider/exceptions"
import { ProviderReader, ProviderRepo } from "@src/application/provider/interfaces"
import { Provider } from "@src/domain/provider/entities"
import { Provider as ProviderModel } from "@src/infrastructure/db/models"
import { QueryRunner } from "typeorm"

export class ProviderRepoImpl implements ProviderRepo {
    constructor(private readonly queryRunner: QueryRunner) { }

    async addProvider(provider: Provider): Promise<void> {
        await this.queryRunner.manager.insert(ProviderModel, provider)
    }

    async deleteProviderById(id: string): Promise<void> {
        await this.queryRunner.manager.delete(ProviderModel, { where: { id: id } })
    }

    async updateProvider(provider: Provider): Promise<void> {
        await this.queryRunner.manager.update(ProviderModel, { where: { id: provider.id } }, provider)
    }
}

export class ProviderReaderImpl implements ProviderReader {
    constructor(private readonly queryRunner: QueryRunner) { }

    async getProviderById(id: string): Promise<ProviderDTO> {
        const provider = await this.queryRunner.manager.findOne(ProviderModel, { where: { id: id } })
        if (!provider) {
            throw new ProviderIdNotFound()
        }
        return provider
    }

    async getProviderByAddress(address: string): Promise<ProviderDTO> {
        const provider = await this.queryRunner.manager.findOne(ProviderModel, { where: { address: address } })
        if (!provider) {
            throw new ProviderAddressNotFound()
        }
        return provider
    }

    async getProviders(): Promise<ProviderDTO[]> {
        return await this.queryRunner.manager.find(ProviderModel)
    }
}
