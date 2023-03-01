import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { FileReaderImpl, FileRepoImpl } from "@src/infrastructure/db/repositories"
import { Request } from "express"
import { QueryRunner } from "typeorm"

export const FileRepo = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `QueryRunner` from the request, which was set in a database middleware
        const queryRunner: QueryRunner = request.app.locals.queryRunner
        const file = new FileRepoImpl(queryRunner)

        return file
    }
)

export const FileReader = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `QueryRunner` from the request, which was set in a database middleware
        const queryRunner: QueryRunner = request.app.locals.queryRunner
        const file = new FileReaderImpl(queryRunner)

        return file
    }
)
