/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ExecutionContext, createParamDecorator } from "@nestjs/common"

import { UnitOfWork as BaseUnitOfWork } from "@src/application/common/interfaces"
import { Request } from "express"

export const UnitOfWork = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `UnitOfWork` from the request, which was set in a database middleware
        const uow: BaseUnitOfWork = request.app.locals.uow

        return uow
    },
)
