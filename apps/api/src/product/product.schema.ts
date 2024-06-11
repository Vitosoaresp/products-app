import { ApiProperty } from '@nestjs/swagger';
import { Product, ProductDto } from '@products-app/schemas';
import { SortOrder } from 'mongoose';
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

export class ListProductsResponse {
	@ApiProperty({ isArray: true, type: ProductSchema })
	data: ProductSchema[];

	@ApiProperty()
	total: number;
}

export class ListProductsParams implements IFindAllParams<Product> {
	@ApiProperty({
		enum: [
			'name',
			'slug',
			'code',
			'description',
			'createdAt',
			'updatedAt',
			'category',
			'quantity',
		],
	})
	orderBy: keyof Product;

	@ApiProperty()
	page: string;

	@ApiProperty()
	perPage: string;

	@ApiProperty()
	search: string;

	@ApiProperty({ enum: ['asc', 'desc'] })
	sort: SortOrder;
}
