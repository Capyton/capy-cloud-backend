import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { UUID } from "@src/utils/uuid"
import { Request } from "express"

export const BagId = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `bagId` from the request, which was set in a files middleware
        const bagId: UUID = request.app.locals.bagId

        return bagId
    }
)
