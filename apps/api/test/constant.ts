import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "../src/auth/auth.module";
import { jwtConstants } from "../src/auth/constants";
import { ProductModule } from "../src/product/product.module";
import { UserModule } from "../src/user/user.module";

export const database = "mongodb://e2e:e2e@localhost/e2e";

export const imports = [
  MongooseModule.forRoot(database),
  ProductModule,
  UserModule,
  AuthModule,
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: "1d" },
  }),
];
