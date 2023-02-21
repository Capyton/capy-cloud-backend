import { Injectable, NestMiddleware } from "@nestjs/common"
import { TypeORMUnitOfWork } from "@src/infrastructure/db/uow"
import { NextFunction, Request, Response } from "express"
import { DataSource, QueryRunner } from "typeorm"

@Injectable()
export class DatabaseMiddleware implements NestMiddleware {
    constructor(private readonly dataSource: DataSource) { }

    /**
     * Get a `QueryRunner` from the `DataSource` and start a transaction
     * @returns A `QueryRunner` that is connected to the database and has a transaction started
     */
    async getQueryRunner(): Promise<QueryRunner> {
        const queryRunner = this.dataSource.createQueryRunner()

        await queryRunner.connect()
        await queryRunner.startTransaction()

        return queryRunner
    }

    async use(req: Request, _res: Response, next: NextFunction) {
        const queryRunner = await this.getQueryRunner()
        const uow = new TypeORMUnitOfWork(queryRunner)

        req.app.locals.queryRunner = queryRunner
        req.app.locals.uow = uow

        next()

        // Release the `QueryRunner` after the request is done
        await queryRunner.release()
    }
}
