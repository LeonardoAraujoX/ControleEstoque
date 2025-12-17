import { EntitySchema } from "typeorm";

export const StockMovement = new EntitySchema({
  name: "StockMovement",
  tableName: "movements",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    type: {
      type: String, // entrada ou saída
    },
    quantity: {
      type: Number,
    },
    createdAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    }
  },
  relations: {
    product: {
      type: "many-to-one",
      target: "Product",
      inverseSide: "movements",
      onDelete: "CASCADE",
    },
    user: {
      type: "many-to-one",
      target: "User",
      inverseSide: "movements",
      onDelete: "SET NULL",
    },
    location: {
      type: "many-to-one",
      target: "Location",
      inverseSide: "movements",
      joinColumn: true,
      onDelete: "SET NULL",
    }
  }
});
