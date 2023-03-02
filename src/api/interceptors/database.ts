import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common"
import { TypeORMUnitOfWork } from "@src/infrastructure/db/uow"
import { DATA_SOURCE } from "@src/inject-constants"
import { Request } from "express"
import { Observable, tap } from "rxjs"
import { DataSource, QueryRunner } from "typeorm"

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

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
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
            })
        )
    }
}
