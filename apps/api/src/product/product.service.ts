import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Product, ProductDto } from "@products-app/schemas";
import { Model } from "mongoose";
import { IFindAllParams, IPaginationResponse } from "../types/commom";
import { generateSlug } from "../utils/generate-slug";

@Injectable()
export class ProductService {
  constructor(
    @Inject("PRODUCT_MODEL") private _model: Model<Product>,
  ) {}

  async findAll({
    orderBy = "updatedAt",
    page = "1",
    perPage = "10",
    search = "",
    sort = "desc",
  }: IFindAllParams<Product>): Promise<IPaginationResponse<Product>> {
    const skip = (Number(page) - 1) * Number(perPage);
    const products = await this._model
      .find({
        deletedAt: null,
        $or: [
          {
            name: {
              $regex: search,
              $options: "i",
            },
          },
          {
            category: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      })
      .limit(Number(perPage))
      .skip(skip)
      .sort({
        [orderBy]: sort,
      });

    const total = await this._model
      .countDocuments({
        deletedAt: null,
        name: {
          $regex: search,
          $options: "i",
        },
        category: {
          $regex: search,
          $options: "i",
        },
      })
      .exec();

    return { data: products, total };
  }

  async create(payload: ProductDto): Promise<Product> {
    const existingName = await this._model
      .findOne({
        name: payload.name,
      })
      .exec();
    if (existingName) {
      throw new BadRequestException(
        `Product with name "${payload.name}" already exists`,
      );
    }
    const existingCode = await this._model
      .findOne({
        code: payload.code,
      })
      .exec();
    if (existingCode) {
      throw new BadRequestException(
        `Product with code "${payload.code}" already exists`,
      );
    }

    const createdProduct = await this._model.create({
      ...payload,
      slug: generateSlug(payload.name),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
    return createdProduct;
  }

  async findOne(slug: string): Promise<Product> {
    return await this._model
      .findOne({ slug })
      .exec()
      .then((product) => {
        if (!product) {
          throw new NotFoundException(`Product with slug ${slug} not found`);
        }
        return product;
      });
  }

  async update(slug: string, payload: ProductDto): Promise<Product> {
    const [existingName, existingCode] = await Promise.all([
      this._model
        .findOne({
          name: payload.name,
          slug: {
            $ne: slug,
          },
        })
        .exec(),
      this._model
        .findOne({
          code: payload.code,
          slug: {
            $ne: slug,
          },
        })
        .exec(),
    ]);

    if (existingName) {
      throw new BadRequestException(
        `Product with name "${payload.name}" already exists`,
      );
    }
    if (existingCode) {
      throw new BadRequestException(
        `Product with code "${payload.code}" already exists`,
      );
    }

    return this._model
      .findOneAndUpdate(
        {
          slug,
        },
        {
          $set: { ...payload, updatedAt: new Date() },
        },
        {
          new: true,
        },
      )
      .exec()
      .then((product) => {
        if (!product) {
          throw new NotFoundException(`Product with slug ${slug} not found`);
        }
        return product;
      });
  }

  async delete(slug: string): Promise<Product> {
    return this._model
      .findOneAndUpdate(
        {
          slug,
        },
        {
          $set: {
            deletedAt: new Date(),
          },
        },
        {
          new: true,
        },
      )
      .exec();
  }
}
