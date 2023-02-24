import { Config as DatabaseConfig } from "@src/infrastructure/db/config"

export class APIConfig {
    constructor(
        public readonly host: string = "localhost",
        public readonly port: number = 8080,
    ) { }
}

export class Config {
    constructor(
        public readonly database: DatabaseConfig,
        public readonly api: APIConfig,
    ) { }
}
