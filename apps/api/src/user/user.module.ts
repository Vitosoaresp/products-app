import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthMiddleware } from "middlewares/auth.middleware";
import { DatabaseModule } from "../database/database.module";
import { UserController } from "./user.controller";
import { userProviders } from "./user.provider";
import { UserService } from "./user.service";

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserModule);
  }
}
