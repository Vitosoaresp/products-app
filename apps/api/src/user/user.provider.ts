import { UserMongooseSchema } from "@products-app/schemas";
import { Connection } from "mongoose";

export const userProviders = [
  {
    provide: "USER_MODEL",
    useFactory: (connection: Connection) =>
      connection.model("User", UserMongooseSchema),
    inject: ["DATABASE_CONNECTION"],
  },
];
