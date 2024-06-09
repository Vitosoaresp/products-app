import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthMiddleware } from "middlewares/auth.middleware";
import { userProviders } from "user/user.provider";
import { UserService } from "user/user.service";
import { DatabaseModule } from "../database/database.module";
import { ProductController } from "./product.controller";
import { productProviders } from "./product.provider";
import { ProductService } from "./product.service";

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [ProductService, ...productProviders, UserService, ...userProviders],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(AuthMiddleware).forRoutes(ProductController);
  }
}
