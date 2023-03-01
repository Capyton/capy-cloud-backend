import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { Request } from "express"

export const BagDir = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `bagDir` from the request, which was set in a files middleware
        const bagDir: string = request.app.locals.bagDir

        return bagDir
    }
)
