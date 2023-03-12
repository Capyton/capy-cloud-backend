/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { BagReaderImpl, BagRepoImpl } from "@src/infrastructure/db/repositories"
import { ExecutionContext, createParamDecorator } from "@nestjs/common"

import { QueryRunner } from "typeorm"
import { Request } from "express"

export const BagRepo = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `QueryRunner` from the request, which was set in a database middleware
        const queryRunner: QueryRunner = request.app.locals.queryRunner
        const bag = new BagRepoImpl(queryRunner)

        return bag
    },
)

export const BagReader = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `QueryRunner` from the request, which was set in a database middleware
        const queryRunner: QueryRunner = request.app.locals.queryRunner
        const bag = new BagReaderImpl(queryRunner)

        return bag
    },
)
