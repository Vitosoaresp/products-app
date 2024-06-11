import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UsePipes,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Product, ProductDto, productSchema } from "@products-app/schemas";
import { Request, Response } from "express";
import { IFindAllParams } from "types/commom";
import { ZodValidationPipe } from "../pipes/zod";
import { ProductService } from "./product.service";

@Controller("products")
@ApiTags("product")
export class ProductController {
  constructor(private _service: ProductService) {}

  @Get()
  async findAll(
    @Req() req: Request<unknown, unknown, unknown, IFindAllParams<Product>>,
    @Res() res: Response,
  ) {
    const response = await this._service.findAll(req.query);

    return res.json(response);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(productSchema))
  async create(@Res() res: Response, @Body() payload: ProductDto) {
    const product = await this._service.create(payload);
    return res.status(HttpStatus.CREATED).json(product);
  }

  @Get(":slug")
  async findOne(@Res() res: Response, @Param() params: { slug: string }) {
    const product = await this._service.findOne(params.slug);
    return res.json(product);
  }

  @Put(":slug")
  @UsePipes(new ZodValidationPipe(productSchema))
  async update(
    @Req() req: Request<{ slug: string }, unknown, ProductDto>,
    @Res() res: Response,
  ) {
    const product = await this._service.update(req.params.slug, req.body);
    return res.json(product);
  }

  @Delete(":slug")
  async delete(@Res() res: Response, @Param() params: { slug: string }) {
    await this._service.delete(params.slug);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
