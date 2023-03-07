import { APIConfig, AuthAndTokensConfig, Config, FilesConfig, TonStorageDaemonCLI } from "@src/api/config"
import { Config as DatabaseConfig } from "@src/infrastructure/db/config"

export function loadConfigFromEnv(): Config {
    const databaseConfig = new DatabaseConfig(
        process.env.POSTGRES_HOST,
        process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : undefined,
        process.env.POSTGRES_USER,
        process.env.POSTGRES_PASSWORD,
        process.env.POSTGRES_DB,
    )

    const apiConfig = new APIConfig(
        process.env.API_HOST,
        process.env.API_PORT ? parseInt(process.env.API_PORT) : undefined,
    )

    const tonStorageDaemonCLI = new TonStorageDaemonCLI(
        process.env.TON_STORAGE_CLI_BIN,
        process.env.TON_STORAGE_CLI_HOST,
        process.env.TON_STORAGE_CLI_PORT ? parseInt(process.env.TON_STORAGE_CLI_PORT) : undefined,
        process.env.TON_STORAGE_CLI_DATABASE,
        process.env.TON_STORAGE_CLI_TIMEOUT ? parseInt(process.env.TON_STORAGE_CLI_TIMEOUT) : undefined,
    )

    const authAndTokensConfig = new AuthAndTokensConfig(
        process.env.PRIVATE_KEY,
        process.env.NONCE_EXPIRATION_TIME ? parseInt(process.env.NONCE_EXPIRATION_TIME) : undefined,
        process.env.ACCESS_TOKEN_EXPIRATION_TIME ? parseInt(process.env.ACCESS_TOKEN_EXPIRATION_TIME) : undefined,
    )

    const filesConfig = new FilesConfig(
        process.env.UPLOAD_DIR,
        process.env.MAX_FILE_SIZE ? parseInt(process.env.MAX_FILE_SIZE) : undefined,
        process.env.MAX_FILES_COUNT ? parseInt(process.env.MAX_FILES_COUNT) : undefined,
    )

    return new Config(databaseConfig, tonStorageDaemonCLI, apiConfig, authAndTokensConfig, filesConfig)
}
