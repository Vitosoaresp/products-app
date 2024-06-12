import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { UserSchema, UserSchemaFactory } from "../user/user.schema";
import { UserService } from "../user/user.service";
import { ProductController } from "./product.controller";
import { ProductSchema, ProductSchemaFactory } from "./product.schema";
import { ProductService } from "./product.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: ProductSchemaFactory, name: ProductSchema.name },
      { schema: UserSchemaFactory, name: UserSchema.name },
    ]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    // ...productProviders,
    UserService,
    // ...userProviders,
  ],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ProductController);
  }
}
