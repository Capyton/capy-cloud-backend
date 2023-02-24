import { NestFactory } from '@nestjs/core'
import { ConfigMiddleware, DatabaseMiddleware } from "@src/api/middlewares"
import { AppModule } from "@src/api/modules"
import { loadConfigFromEnv } from "@src/infrastructure/config_loader"
import { Config as DatabaseConfig } from "@src/infrastructure/db/config"
import { Bag, File, Provider, ProviderBag, User, UserBag } from "@src/infrastructure/db/models"
import { DataSource } from "typeorm"

function getDataSource(config: DatabaseConfig): DataSource {
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
    entities: [Bag, File, Provider, ProviderBag, User, UserBag],
  })

  return dataSource
}

async function main(): Promise<void> {
  const config = loadConfigFromEnv()
  console.log(`Loaded config: \`${JSON.stringify(config, null, 0)}\`\n`)

  const dataSource = getDataSource(config.database)
  dataSource.initialize()
    .then(() => console.log("Database initialized"))
    .catch((err) => console.error(`Database initialization failed with error: \`${err}\``))

  const app = await NestFactory.create(AppModule)
  app.use(new ConfigMiddleware(config))
  app.use(new DatabaseMiddleware(dataSource))

  console.log("Launch app")
  await app.listen(config.api.port, config.api.host)
}


main()
