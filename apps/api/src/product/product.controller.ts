import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { productSchema } from "@products-app/schemas";
import { ZodValidationPipe } from "../pipes/zod";
import {
  ListProductsParams,
  ListProductsResponse,
  ProductSchema,
  ProductSchemaDto,
} from "./product.schema";
import { ProductService } from "./product.service";

@Controller("products")
@ApiBearerAuth()
@ApiTags("Product")
export class ProductController {
  constructor(private _service: ProductService) {}

  @Get()
  @ApiResponse({ status: 200, type: ListProductsResponse })
  async findAll(@Query() query: ListProductsParams) {
    const response = await this._service.findAll(query);

    return response;
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: "Product created",
    type: ProductSchema,
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @UsePipes(new ZodValidationPipe(productSchema))
  async create(@Body() payload: ProductSchemaDto) {
    const product = await this._service.create(payload);
    return product;
  }

  @Get(":slug")
  @ApiParam({ name: "slug", required: true })
  @ApiResponse({
    status: 200,
    description: "Product found",
    type: ProductSchema,
  })
  @ApiResponse({ status: 404, description: "Product not found" })
  async findOne(@Param() params: { slug: string }) {
    const product = await this._service.findOne(params.slug);
    return product;
  }

  @Put(":slug")
  @ApiParam({ name: "slug", required: true })
  @UsePipes(new ZodValidationPipe(productSchema))
  @ApiResponse({
    status: 200,
    description: "Product updated",
    type: ProductSchema,
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  async update(
    @Param() param: { slug: string },
    @Body() payload: ProductSchemaDto,
  ) {
    const product = await this._service.update(param.slug, payload);
    return product;
  }

  @Delete(":slug")
  @ApiParam({ name: "slug", required: true })
  async delete(@Param() params: { slug: string }) {
    return await this._service.delete(params.slug);
  }
}
