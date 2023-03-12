/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ExecutionContext, createParamDecorator } from "@nestjs/common"

import { AuthUserRepoImpl } from "@src/infrastructure/db/repositories"
import { QueryRunner } from "typeorm"
import { Request } from "express"

export const AuthUserRepo = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `QueryRunner` from the request, which was set in a database middleware
        const queryRunner: QueryRunner = request.app.locals.queryRunner
        const authUser = new AuthUserRepoImpl(queryRunner)

        return authUser
    },
)
