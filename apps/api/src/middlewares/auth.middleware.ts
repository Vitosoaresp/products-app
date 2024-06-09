import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private _userService: UserService, private _jwtService: JwtService) {}

  async use(req: Request, _: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    if (!authHeaders) {
      throw new UnauthorizedException("Token not found");
    }

    try {
      const token = authHeaders.split(" ")[1];
      const decoded = this._jwtService.decode<{ email: string, id: string }>(token);
      const user = await this._userService.findOne(decoded.email);

      user.password = undefined;

      req['user'] = user;
      next();
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}