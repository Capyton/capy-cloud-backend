import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common"

@Injectable()
export class Auth implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        // TODO: Implement auth filter
        const userIsAuth = true

        return userIsAuth
    }
}
