import { DataSource } from "typeorm";
import "dotenv/config";

import { User } from "../entities/User.js";
import { Product } from "../entities/Product.js";
import { StockMovement } from "../entities/StockMovement.js";

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  synchronize: true,
  logging: false,
  entities: [User, Product, StockMovement],
});

export default AppDataSource;

