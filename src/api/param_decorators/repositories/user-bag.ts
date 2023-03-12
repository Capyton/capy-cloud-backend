/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ExecutionContext, createParamDecorator } from "@nestjs/common"
import { UserBagReaderImpl, UserBagRepoImpl } from "@src/infrastructure/db/repositories"

import { QueryRunner } from "typeorm"
import { Request } from "express"

export const UserBagRepo = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `QueryRunner` from the request, which was set in a database middleware
        const queryRunner: QueryRunner = request.app.locals.queryRunner
        const userBag = new UserBagRepoImpl(queryRunner)

        return userBag
    },
)

export const UserBagReader = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `QueryRunner` from the request, which was set in a database middleware
        const queryRunner: QueryRunner = request.app.locals.queryRunner
        const userBag = new UserBagReaderImpl(queryRunner)

        return userBag
    },
)
