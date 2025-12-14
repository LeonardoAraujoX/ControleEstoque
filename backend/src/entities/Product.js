import { EntitySchema } from "typeorm";


export const Product = new EntitySchema({
  name: "Product",
  tableName: "products",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    reference: {
      type: String,
    },
    description: {
      type: String,
    },
    brand: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
    updatedAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
    }
  },
  relations: {
    movements: {
      type: "one-to-many",
      target: "StockMovement",
      inverseSide: "product",
    }
  }
});
