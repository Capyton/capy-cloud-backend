import { UnitOfWork } from "@src/application/common/interfaces/uow"
import { QueryRunner } from "typeorm"

export class TypeORMUnitOfWork implements UnitOfWork {
    constructor(
        readonly queryRunner: QueryRunner
    ) { }

    async commit(): Promise<void> {
        await this.queryRunner.commitTransaction()
    }

    async rollback(): Promise<void> {
        await this.queryRunner.rollbackTransaction()
    }
}
