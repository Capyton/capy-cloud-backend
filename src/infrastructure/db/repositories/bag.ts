import { BagBagIdNotFound, BagIdNotFound } from "@src/application/bag/exceptions"
import { BagReader, BagRepo } from "@src/application/bag/interfaces"

import { Bag } from "@src/domain/bag/entities"
import { Bag as BagDTO } from "@src/application/bag/dto"
import { BagId } from "@src/domain/bag/types"
import { Bag as BagModel } from "@src/infrastructure/db/models"
import { QueryRunner } from "typeorm"
import { UUID } from "@src/utils/uuid"

export class BagRepoImpl implements BagRepo {
    constructor(private readonly queryRunner: QueryRunner) { }

    async getBagById(id: UUID): Promise<Bag> {
        const bag = await this.queryRunner.manager.findOne(BagModel, { where: { id: id } })
        if (!bag) {
            throw new BagIdNotFound()
        }
        return bag
    }

    async addBag(bag: Bag): Promise<void> {
        await this.queryRunner.manager.insert(BagModel, bag)
    }

    async updateBad(bag: Bag): Promise<void> {
        await this.queryRunner.manager.update(BagModel, { id: bag.id }, bag)
    }

    async deleteBagById(id: UUID): Promise<void> {
        await this.queryRunner.manager.delete(BagModel, { id: id })
    }
}

export class BagReaderImpl implements BagReader {
    constructor(private readonly queryRunner: QueryRunner) { }

    async getBagById(id: UUID): Promise<BagDTO> {
        const bag = await this.queryRunner.manager.findOne(BagModel, { where: { id: id } })
        if (!bag) {
            throw new BagIdNotFound()
        }
        return bag
    }

    async getBagByBagId(bagId: BagId): Promise<BagDTO> {
        const bag = await this.queryRunner.manager.findOne(BagModel, { where: { bagId: bagId } })
        if (!bag) {
            throw new BagBagIdNotFound
        }
        return bag
    }
}
