import { User } from "./src/infrastructure/db/models/User";
import { Bag } from "./src/infrastructure/db/models/Bag";
import { File } from "./src/infrastructure/db/models/File";
import { Provider } from "./src/infrastructure/db/models/Provider";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "test",
  password: "test",
  database: "test",
  synchronize: true,
  logging: true,
  entities: [User, Bag, File, Provider],
  subscribers: [],
  migrations: [],
});
