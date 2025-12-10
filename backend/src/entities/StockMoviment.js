import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from "./Product.js";
import { User } from "./User.js";

@Entity()
export class StockMovement {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  type; // "entrada" ou "saida"

  @Column({ type: "int" })
  quantity;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt;

  @ManyToOne(() => Product, (product) => product.movements, {
    onDelete: "CASCADE",
  })
  product;

  @ManyToOne(() => User, (user) => user.movements, {
    onDelete: "SET NULL",
  })
  user;
}
