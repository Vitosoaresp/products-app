import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { ProductModule } from "./product/product.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [ProductModule, UserModule, AuthModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
