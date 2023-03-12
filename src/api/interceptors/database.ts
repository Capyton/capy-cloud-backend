import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common"
import { DataSource, QueryRunner } from "typeorm"
import { Observable, tap } from "rxjs"

import { DATA_SOURCE } from "@src/inject-constants"
import { Request } from "express"
import { TypeORMUnitOfWork } from "@src/infrastructure/db/uow"

@Injectable()
export class DatabaseInterceptor implements NestInterceptor {
    constructor(@Inject(DATA_SOURCE) private readonly dataSource: DataSource) { }

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

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<unknown>> {
        const queryRunner = await this.getQueryRunner()
        const uow = new TypeORMUnitOfWork(queryRunner)

        const ctx = context.switchToHttp()
        const req = ctx.getRequest<Request>()

        req.app.locals.queryRunner = queryRunner
        req.app.locals.uow = uow

        return next.handle().pipe(
            tap(() => {
                // Release the `QueryRunner` after the request is done
                queryRunner.release()
                    .catch((err) => console.error("Failed to release the QueryRunner: ", err))
            }),
        )
    }
}
