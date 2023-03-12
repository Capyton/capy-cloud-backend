import { ProviderAddressNotFound, ProviderIdNotFound } from "@src/application/provider/exceptions"
import { ProviderReader, ProviderRepo } from "@src/application/provider/interfaces"

import { Provider } from "@src/domain/provider/entities"
import { ProviderAddress } from "@src/domain/provider/types"
import { Provider as ProviderDTO } from "@src/application/provider/dto"
import { Provider as ProviderModel } from "@src/infrastructure/db/models"
import { QueryRunner } from "typeorm"
import { UUID } from "@src/utils/uuid"

export class ProviderRepoImpl implements ProviderRepo {
    constructor(private readonly queryRunner: QueryRunner) { }

    async getProviderById(id: UUID): Promise<Provider> {
        const provider = await this.queryRunner.manager.findOne(ProviderModel, { where: { id: id } })
        if (!provider) {
            throw new ProviderIdNotFound()
        }
        return provider
    }

    async addProvider(provider: Provider): Promise<void> {
        await this.queryRunner.manager.insert(ProviderModel, provider)
    }

    async deleteProviderById(id: UUID): Promise<void> {
        await this.queryRunner.manager.delete(ProviderModel, { where: { id: id } })
    }

    async deleteProviderByAddress(address: ProviderAddress): Promise<void> {
        await this.queryRunner.manager.delete(ProviderModel, { where: { address: address } })
    }

    async updateProvider(provider: Provider): Promise<void> {
        await this.queryRunner.manager.update(ProviderModel, { where: { id: provider.id } }, provider)
    }
}

export class ProviderReaderImpl implements ProviderReader {
    constructor(private readonly queryRunner: QueryRunner) { }

    async getProviderById(id: UUID): Promise<ProviderDTO> {
        const provider = await this.queryRunner.manager.findOne(ProviderModel, { where: { id: id } })
        if (!provider) {
            throw new ProviderIdNotFound()
        }
        return provider
    }

    async getProviderByAddress(address: ProviderAddress): Promise<ProviderDTO> {
        const provider = await this.queryRunner.manager.findOne(ProviderModel, { where: { address: address } })
        if (!provider) {
            throw new ProviderAddressNotFound()
        }
        return provider
    }

    getProviders(): Promise<ProviderDTO[]> {
        return this.queryRunner.manager.find(ProviderModel)
    }
}
