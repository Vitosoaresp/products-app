import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { UserController } from "./user.controller";
import { userProviders } from "./user.providers";
import { UserService } from "./user.service";

@Module({
  imports: [
    DatabaseModule,
    // MongooseModule.forFeature([
    //   { schema: UserSchemaFactory, name: UserSchema.name },
    // ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    ...userProviders,
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserController);
  }
}
