import { loadConfigFromEnv } from "@src/infrastructure/config_loader"

async function main(): Promise<void> {
  const config = loadConfigFromEnv()
  console.log(`Loaded config: ${JSON.stringify(config, null, 0)}\n`)

  console.log("Launch app")
}


main()
