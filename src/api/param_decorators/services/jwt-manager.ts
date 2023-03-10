import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { JwtManager as IJwtManager } from "@src/application/auth/interfaces"
import { Request } from "express"

export const JwtManager = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        // Get the `JwtManager` from the request, which was set in a jwt manager middleware
        const jwtManager: IJwtManager = request.app.locals.jwtManager

        return jwtManager
    }
)
