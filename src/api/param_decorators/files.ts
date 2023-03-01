import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { Request } from "express"

export const Files = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `Multer.File` list from the request, that were set in a files middleware
        const files = request.files

        return files
    }
)
