import { Config as DatabaseConfig } from "@src/infrastructure/db/config";

export class APIConfig {
    constructor(
        public readonly host: string = "localhost",
        public readonly port: number = 8080,
    ) { }
}

export class AuthAndTokensConfig {
    constructor(
        public readonly privateKey: string = "",
        public readonly nonceExpirationTime: number = 10 * 60 * 1000, // 10 minutes in milliseconds
        public readonly accessTokenExpirationTime: number = 3600, // 1 hour in seconds
    ) { }
}

export class Config {
    constructor(
        public readonly database: DatabaseConfig,
        public readonly api: APIConfig,
        public readonly authAndTokens: AuthAndTokensConfig,
    ) { }
}
