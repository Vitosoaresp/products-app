import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "config/configuration";
import { AuthModule } from "./auth/auth.module";
import { ProductModule } from "./product/product.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ProductModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
