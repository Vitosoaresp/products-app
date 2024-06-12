import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Product, ProductDto } from "@products-app/schemas";
import { SortOrder } from "mongoose";
import { IFindAllParams } from "types/commom";

export class ProductSchemaDto implements ProductDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty()
  category: string;

  @ApiProperty({ required: true })
  price: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty({ required: true })
  code: number;
}

@Schema({
  timestamps: false,
})
export class ProductSchema extends ProductSchemaDto implements Product {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt?: Date;

  @ApiProperty()
  deletedAt?: Date;

  @ApiProperty()
  slug: string;
}

export const ProductSchemaFactory = SchemaFactory.createForClass(ProductSchema);

export class ListProductsResponse {
  @ApiProperty({ isArray: true, type: ProductSchema })
  data: ProductSchema[];

  @ApiProperty()
  total: number;
}

export class ListProductsParams implements IFindAllParams<Product> {
  @ApiProperty({
    enum: [
      "name",
      "slug",
      "code",
      "description",
      "createdAt",
      "updatedAt",
      "category",
      "quantity",
    ],
    required: false,
  })
  orderBy: keyof Product;

  @ApiProperty({ required: false })
  page: string;

  @ApiProperty({ required: false })
  perPage: string;

  @ApiProperty({ required: false })
  search: string;

  @ApiProperty({ enum: ["asc", "desc"], required: false })
  sort: SortOrder;
}
