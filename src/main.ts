import { Bag, File, Provider, ProviderBag, User, UserBag } from "@src/infrastructure/db/models"
import { ConfigMiddleware, LoggingMiddleware, JwtManagerMiddleware, TonStorageMiddleware } from "@src/api/middlewares"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

import { ApiModule } from "@src/api/modules"
import { ApplicationExceptionFilter } from "@src/api/filters"
import { DataSource } from "typeorm"
import { Config as DatabaseConfig } from "@src/infrastructure/db/config"
import { DatabaseInterceptor } from "@src/api/interceptors"
import { NestFactory } from "@nestjs/core"
import TonstorageCLI from "tonstorage-cli"
import { ValidationPipe } from "@nestjs/common"
import { loadConfigFromEnv } from "@src/infrastructure/config-loader"

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

    const app = await NestFactory.create(ApiModule.forRoot(config, dataSource, storageDaemonCLI))
    app.setGlobalPrefix("/api/v1")

    const loggingMiddleware = new LoggingMiddleware()
    const configMiddleware = new ConfigMiddleware(config)
    const tonStorageMiddleware = new TonStorageMiddleware(storageDaemonCLI)
    const jwtManagerMiddleware = new JwtManagerMiddleware(config.authAndTokens)

    app.use(loggingMiddleware.use.bind(loggingMiddleware))
    app.use(configMiddleware.use.bind(configMiddleware))
    app.use(tonStorageMiddleware.use.bind(tonStorageMiddleware))
    app.use(jwtManagerMiddleware.use.bind(jwtManagerMiddleware))
    console.log("Middlewares registered")

    app.useGlobalInterceptors(new DatabaseInterceptor(dataSource))
    console.log("Global interceptors registered")

    app.useGlobalFilters(new ApplicationExceptionFilter())
    console.log("Global filters registered")

    app.useGlobalPipes(new ValidationPipe({
        transform: true,
        disableErrorMessages: false,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }))
    console.log("Global pipes registered")

    const swaggerConfig = new DocumentBuilder()
        .setTitle("CapyCloud API")
        .setDescription("Endpoints of CapyCloud API")
        .setVersion("1.0.0-dev")
        .setLicense("Apache 2.0", "https://www.apache.org/licenses/LICENSE-2.0")
        .addBearerAuth({
            type: "http",
            description: "Auth token",
            name: "Authorization",
            scheme: "bearer",
            bearerFormat: "JWT",
        })
        .build()
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
    SwaggerModule.setup("swagger", app, swaggerDocument, {
        useGlobalPrefix: false,
    })

    console.log(`Starting server on \`${config.api.host}:${config.api.port}\``)
    await app.listen(config.api.port, config.api.host)
}


main()
    .then(() => console.log("Server started"))
    .catch((err) => console.error(`Server start failed with error: \`${err}\``))
