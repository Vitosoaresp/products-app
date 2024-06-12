import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { UserController } from "./user.controller";
import { UserSchema, UserSchemaFactory } from "./user.schema";
import { UserService } from "./user.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: UserSchemaFactory, name: UserSchema.name },
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserController);
  }
}
