import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { StockMovement } from "./StockMovement.js";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  reference;

  @Column()
  description;

  @Column()
  brand;

  @Column({ type: "int", default: 0 })
  quantity;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt;

  @OneToMany(() => StockMovement, (movement) => movement.product)
  movements;
}
