import { Config as DatabaseConfig } from "@src/infrastructure/db/config";

export class APIConfig {
    constructor(
        public readonly host: string = "127.0.0.1",
        public readonly port: number = 5000,
    ) { }
}

export class AuthAndTokensConfig {
    constructor(
        public readonly privateKey: string = "",
        public readonly nonceExpirationTime: number = 10 * 60 * 1000, // 10 minutes in milliseconds
        public readonly accessTokenExpirationTime: number = 3600, // 1 hour in seconds
    ) { }
}

export class FilesConfig {
    constructor(
        public readonly uploadDir: string = "/tmp/capy_cloud_backend/uploads",
        public readonly maxFileSize: number = 524 * 1024 * 1024, // 524 MB in bytes
        public readonly maxFilesCount: number = 64,
    ) { }
}

export class Config {
    constructor(
        public readonly database: DatabaseConfig,
        public readonly api: APIConfig,
        public readonly authAndTokens: AuthAndTokensConfig,
        public readonly files: FilesConfig,
    ) { }
}
