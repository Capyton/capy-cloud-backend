/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ExecutionContext, createParamDecorator } from "@nestjs/common"

import { Request } from "express"

/**
 * Decorator for injecting the cookies from the request
 * @param cookieKey The cookie key, if not passed, all cookies will be returned
 */
export const Cookies = createParamDecorator(
    (cookieKey: string, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest()
        const cookies = request.cookies

        return cookieKey ? cookies[cookieKey] : cookies
    },
)
