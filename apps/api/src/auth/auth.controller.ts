import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Signin } from "@products-app/schemas";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private _service: AuthService) {}

  @Post('signin')
  async signin(@Body() payload: Signin, @Res() res: Response) {
    const { user, token } = await this._service.signin(payload);
    return res.json({ user, token });
  }

  @Get('me')
  async me(@Res() res: Response, @Req() req: Request) {
    return res.json(req['user']);
  }
}
