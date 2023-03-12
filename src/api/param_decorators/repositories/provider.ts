/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ExecutionContext, createParamDecorator } from "@nestjs/common"
import { ProviderReaderImpl, ProviderRepoImpl } from "@src/infrastructure/db/repositories"

import { QueryRunner } from "typeorm"
import { Request } from "express"

export const ProviderRepo = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `QueryRunner` from the request, which was set in a database middleware
        const queryRunner: QueryRunner = request.app.locals.queryRunner
        const provider = new ProviderRepoImpl(queryRunner)

        return provider
    },
)

export const ProviderReader = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `QueryRunner` from the request, which was set in a database middleware
        const queryRunner: QueryRunner = request.app.locals.queryRunner
        const provider = new ProviderReaderImpl(queryRunner)

        return provider
    },
)
