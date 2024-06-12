import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { userProviders } from "../user/user.providers";
import { UserService } from "../user/user.service";
import { ProductController } from "./product.controller";
import { productProviders } from "./product.providers";
import { ProductService } from "./product.service";

@Module({
  imports: [
    // MongooseModule.forFeature([
    //   { schema: ProductSchemaFactory, name: ProductSchema.name },
    //   { schema: UserSchemaFactory, name: UserSchema.name },
    // ]),
    DatabaseModule,
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    ...productProviders,
    UserService,
    ...userProviders,
  ],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ProductController);
  }
}
