import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Request, Response } from "express";
import {
  AuthMeResponse,
  AuthRegisterDto,
  AuthSignInDto,
  AuthSignInResponse,
} from "./auth.schema";
import { AuthService } from "./auth.service";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private _service: AuthService) {}

  @Post("signin")
  @ApiResponse({
    status: 200,
    description: "User signed in",
    type: AuthSignInResponse,
  })
  async signin(@Body() payload: AuthSignInDto) {
    const { user, token } = await this._service.signin(payload);
    return { user, token };
  }

  @Post("register")
  @ApiCreatedResponse({ description: "User registered", type: AuthMeResponse })
  async register(@Body() payload: AuthRegisterDto) {
    const response = await this._service.register(payload);
    return response;
  }

  @Get("me")
  @ApiHeader({
    name: "Authorization",
    description: "Bearer token",
  })
  @ApiResponse({ status: 200, description: "User found", type: AuthMeResponse })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  async me(@Res() res: Response, @Req() req: Request) {
    return res.json(req["user"]);
  }
}
