import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import { DataSource } from "typeorm";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  synchronize: false,
  logging: false,
  entities: [path.join(__dirname, "../entities/*.js")],
  migrations: [path.join(__dirname, "../migrations/*.js")],
});
