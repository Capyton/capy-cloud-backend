export class AuthTokens {
    constructor(
        readonly accessToken: string,
        readonly refreshToken: string,
    ) { }
}
