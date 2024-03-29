import { ProviderBagReader, ProviderBagRepo } from "@src/application/provider_bag/interfaces"

import { ProviderBag } from "@src/domain/provider_bag/entities"
import { ProviderBag as ProviderBagDTO } from "@src/application/provider_bag/dto"
import { ProviderBagIdNotFound } from "@src/application/provider_bag/exceptions"
import { ProviderBag as ProviderBagModel } from "@src/infrastructure/db/models"
import { QueryRunner } from "typeorm"
import { UUID } from "@src/utils/uuid"

export class ProviderBagRepoImpl implements ProviderBagRepo {
    constructor(private readonly queryRunner: QueryRunner) { }

    async addProviderBag(providerBag: ProviderBag): Promise<void> {
        await this.queryRunner.manager.insert(ProviderBagModel, providerBag)
    }

    async deleteProviderBagById(id: UUID): Promise<void> {
        await this.queryRunner.manager.delete(ProviderBagModel, { where: { id: id } })
    }

    async deleteProviderBagsByProviderId(providerId: UUID): Promise<void> {
        await this.queryRunner.manager.delete(ProviderBagModel, { where: { providerId: providerId } })
    }
}

export class ProviderBagReaderImpl implements ProviderBagReader {
    constructor(private readonly queryRunner: QueryRunner) { }

    async getProviderBagById(id: UUID): Promise<ProviderBagDTO> {
        const providerBag = await this.queryRunner.manager.findOne(ProviderBagModel, { where: { id: id } })
        if (!providerBag) {
            throw new ProviderBagIdNotFound()
        }
        return providerBag
    }

    async getProviderBagsByProviderId(providerId: UUID): Promise<ProviderBagDTO[]> {
        return await this.queryRunner.manager.find(ProviderBagModel, { where: { providerId: providerId } })
    }
}
