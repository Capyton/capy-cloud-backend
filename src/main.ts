import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { ApplicationExceptionFilter } from "@src/api/filters"
import { DatabaseInterceptor } from "@src/api/interceptors"
import { ConfigMiddleware, TonStorageMiddleware } from "@src/api/middlewares"
import { APIModule } from "@src/api/modules"
import { loadConfigFromEnv } from "@src/infrastructure/config-loader"
import { Config as DatabaseConfig } from "@src/infrastructure/db/config"
import { Bag, File, Provider, ProviderBag, User, UserBag } from "@src/infrastructure/db/models"
import TonstorageCLI from "tonstorage-cli"
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

  const storageDaemonCLI = new TonstorageCLI({
    bin: config.tonStorageDaemonCLI.bin,
    host: `${config.tonStorageDaemonCLI.host}:${config.tonStorageDaemonCLI.port}`,
    database: config.tonStorageDaemonCLI.database,
    timeout: config.tonStorageDaemonCLI.timeout,
  })

  const api = await NestFactory.create(APIModule.forRoot(config, dataSource, storageDaemonCLI))

  const configMiddleware = new ConfigMiddleware(config)
  const tonStorageMiddleware = new TonStorageMiddleware(storageDaemonCLI)

  api.use(configMiddleware.use.bind(configMiddleware))
  api.use(tonStorageMiddleware.use.bind(tonStorageMiddleware))
  console.log("Middlewares registered")

  api.useGlobalInterceptors(new DatabaseInterceptor(dataSource))
  console.log("Global interceptors registered")

  api.useGlobalFilters(new ApplicationExceptionFilter())
  console.log("Global filters registered")

  api.useGlobalPipes(new ValidationPipe({
    transform: true,
    disableErrorMessages: false,
    transformOptions: {
      enableImplicitConversion: true,
    }
  }))
  console.log("Global pipes registered")

  console.log(`Starting server on \`${config.api.host}:${config.api.port}\``)
  await api.listen(config.api.port, config.api.host)
}


main()
