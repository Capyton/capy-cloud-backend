import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator for injecting the cookies from the request
 * @param cookieKey The cookie key, if not passed, all cookies will be returned
 */
export const Cookies = createParamDecorator(
    (cookieKey: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest()
        const cookies = request.cookies

        return cookieKey ? cookies[cookieKey] : cookies
    },
);
