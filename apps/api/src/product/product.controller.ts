import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UsePipes } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ProductDto, productSchema } from "@products-app/schemas";
import { Response } from "express";
import { ZodValidationPipe } from "../pipes/zod";
import { ProductService } from "./product.service";

@Controller("products")
@ApiTags("product")
export class ProductController {
  constructor(private _service: ProductService) {}

  @Get()
  async findAll() {
    return this._service.findAll();
  }

  @Post()
  @UsePipes(new ZodValidationPipe(productSchema))
  async create(@Res() res: Response, @Body() payload: ProductDto) {
    const product = await this._service.create(payload);
    return res.status(HttpStatus.CREATED).json(product);
  }

  @Get(':slug')
  async findOne(@Res() res: Response, @Param() params: { slug: string }) {
    const product = await this._service.findOne(params.slug);
    return res.json(product);
  }

  @Put(':slug')
  @UsePipes(new ZodValidationPipe(productSchema))
  async update(
    @Res() res: Response,
    @Param() params: { slug: string },
    @Body() payload: ProductDto,
  ) {
    const product = await this._service.update(params.slug, payload);
    return res.json(product);
  }

  @Delete(':slug')
  async delete(@Res() res: Response, @Param() params: { slug: string }) {
    await this._service.delete(params.slug);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
