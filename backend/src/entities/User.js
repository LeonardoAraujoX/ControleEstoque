import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { StockMovement } from "./StockMovement.js";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  name;

  @Column({ unique: true })
  email;

  @Column()
  password;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt;

  @OneToMany(() => StockMovement, (movement) => movement.user)
  movements;
}
