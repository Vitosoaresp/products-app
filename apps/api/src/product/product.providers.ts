import { ProductMongooseSchema } from "@products-app/schemas";
import { Connection } from "mongoose";

export const productProviders = [
  {
    provide: "PRODUCT_MODEL",
    useFactory: (connection: Connection) =>
      connection.model("Product", ProductMongooseSchema),
    inject: ["DATABASE_CONNECTION"],
  },
];