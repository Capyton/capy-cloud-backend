/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ExecutionContext, createParamDecorator } from "@nestjs/common"

import { Request } from "express"
import { UUID } from "@src/utils/uuid"

export const BagId = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `bagId` from the request, which was set in a files middleware
        const bagId: UUID = request.app.locals.bagId

        return bagId
    },
)
