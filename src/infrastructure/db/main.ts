import { Bag, File, Provider, ProviderBag, RefreshToken, User, UserBag } from "@src/infrastructure/db/models"
import { DataSource } from "typeorm"
import { Config as DatabaseConfig } from "@src/infrastructure/db/config"


export function getDataSource(config: DatabaseConfig): DataSource {
    const dataSource = new DataSource({
        type: "postgres",
        host: config.host,
        port: config.port,
        username: config.user,
        password: config.password,
        database: config.database,
        synchronize: true,
        logging: true,
        subscribers: [],
        migrations: [],
        entities: [Bag, File, Provider, ProviderBag, User, UserBag, RefreshToken],
    })

    return dataSource
}
