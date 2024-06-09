import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthMiddleware } from "middlewares/auth.middleware";
import { DatabaseModule } from "../database/database.module";
import { userProviders } from "../user/user.provider";
import { UserService } from "../user/user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./constants";

@Module({
  imports: [DatabaseModule, JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: "1d" },
  })],
  controllers: [AuthController],
  providers: [AuthService, UserService, ...userProviders],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(AuthMiddleware).forRoutes({
        path: "auth/me",
        method: RequestMethod.GET,
      });
  }
}