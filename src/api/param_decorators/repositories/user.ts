/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ExecutionContext, createParamDecorator } from "@nestjs/common"
import { UserReaderImpl, UserRepoImpl } from "@src/infrastructure/db/repositories"

import { QueryRunner } from "typeorm"
import { Request } from "express"

export const UserRepo = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `QueryRunner` from the request, which was set in a database middleware
        const queryRunner: QueryRunner = request.app.locals.queryRunner
        const user = new UserRepoImpl(queryRunner)

        return user
    },
)

export const UserReader = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `QueryRunner` from the request, which was set in a database middleware
        const queryRunner: QueryRunner = request.app.locals.queryRunner
        const user = new UserReaderImpl(queryRunner)

        return user
    },
)
