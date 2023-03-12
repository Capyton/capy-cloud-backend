/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ExecutionContext, createParamDecorator } from "@nestjs/common"
import { FileReaderImpl, FileRepoImpl } from "@src/infrastructure/db/repositories"

import { QueryRunner } from "typeorm"
import { Request } from "express"

export const FileRepo = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `QueryRunner` from the request, which was set in a database middleware
        const queryRunner: QueryRunner = request.app.locals.queryRunner
        const file = new FileRepoImpl(queryRunner)

        return file
    },
)

export const FileReader = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `QueryRunner` from the request, which was set in a database middleware
        const queryRunner: QueryRunner = request.app.locals.queryRunner
        const file = new FileReaderImpl(queryRunner)

        return file
    },
)
