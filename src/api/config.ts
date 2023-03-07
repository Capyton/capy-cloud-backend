import { Config as DatabaseConfig } from "@src/infrastructure/db/config";

export class APIConfig {
    constructor(
        public readonly host: string = "127.0.0.1",
        public readonly port: number = 5000,
    ) { }
}

export class TonStorageDaemonCLI {
    constructor(
        public readonly bin: string = "/usr/local/bin/ton-storage/storage-daemon-cli",
        public readonly host: string = "capy-cloud-backend.storage-daemon",
        public readonly port: number = 5555,
        public readonly database: string = "/data/capy_cloud_ton_storage",
        public readonly timeout: number = 5000,
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
        public readonly uploadDir: string = "uploads",
        public readonly maxFileSize: number = 524 * 1024 * 1024, // 524 MB in bytes
        public readonly maxFilesCount: number = 64,
    ) { }
}

export class Config {
    constructor(
        public readonly database: DatabaseConfig,
        public readonly tonStorageDaemonCLI: TonStorageDaemonCLI,
        public readonly api: APIConfig,
        public readonly authAndTokens: AuthAndTokensConfig,
        public readonly files: FilesConfig,
    ) { }
}
