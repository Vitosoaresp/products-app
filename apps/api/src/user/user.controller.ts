import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UsePipes } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { User, UserDto, userSchema } from "@products-app/schemas";
import { Response } from "express";
import { ZodValidationPipe } from "pipes/zod";
import { UserService } from "./user.service";

@Controller("users")
@ApiTags("user")
export class UserController {
  constructor(private _service: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this._service.findAll();
  }

  @Get(":email")
  async findOne(@Param() params: { email: string }, @Res() res: Response) {
    const user = await this._service.findOne(params.email);

    user.password = undefined;

    return res.json(user);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(userSchema))
  async create(@Body() payload: UserDto, @Res() res: Response) {
    const user = await this._service.create(payload);
    return res.status(HttpStatus.CREATED).json(user);
  }

  @Put(":id")
  @UsePipes(new ZodValidationPipe(userSchema))
  async update(
    @Param() params: { id: string },
    @Body() payload: UserDto,
    @Res() res: Response,
  ) {
    const user = await this._service.update(params.id, payload);
    return res.json(user);
  }

  @Delete(":id")
  async delete(@Param() params: { id: string }, @Res() res: Response) {
    await this._service.delete(params.id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }

}
