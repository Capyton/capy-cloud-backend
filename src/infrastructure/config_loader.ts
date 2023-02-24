import { APIConfig, Config } from "@src/api/config"
import { Config as DatabaseConfig } from "@src/infrastructure/db/config"

export function loadConfigFromEnv(): Config {
    const databaseConfig = new DatabaseConfig(
        process.env.DATABASE_HOST,
        process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : undefined,
        process.env.DATABASE_USER,
        process.env.DATABASE_PASSWORD,
        process.env.DATABASE_NAME,
    )

    const apiConfig = new APIConfig(
        process.env.API_HOST,
        process.env.API_PORT ? parseInt(process.env.API_PORT) : undefined,
    )

    return new Config(databaseConfig, apiConfig)
}
