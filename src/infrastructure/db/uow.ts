import { QueryRunner } from "typeorm"
import { UnitOfWork } from "@src/application/common/interfaces/uow"

export class TypeORMUnitOfWork implements UnitOfWork {
    constructor(
        private readonly queryRunner: QueryRunner,
    ) { }

    async commit(): Promise<void> {
        await this.queryRunner.commitTransaction()
        await this.queryRunner.startTransaction()
    }

    async rollback(): Promise<void> {
        await this.queryRunner.rollbackTransaction()
    }
}
