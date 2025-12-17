import { EntitySchema } from "typeorm";

export const Location = new EntitySchema({
  name: "Location",
  tableName: "locations",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    code: {
      type: String,
      unique: true, // Ex: A1, B2, P03
    },
    description: {
      type: String,
    },
    qrCode: {
      type: String,
      unique: true, // Valor que será usado para gerar o QR
    },
    createdAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    }
  },
  relations: {
    products: {
      type: "one-to-many",
      target: "Product",
      inverseSide: "location",
    },
    movements: {
      type: "one-to-many",
      target: "StockMovement",
      inverseSide: "location",
    }
  }
});
