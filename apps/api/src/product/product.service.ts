import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Product, ProductDto } from "@products-app/schemas";
import { Model } from "mongoose";
import { generateSlug } from "../utils/generate-slug";

@Injectable()
export class ProductService {
  constructor(@Inject("PRODUCT_MODEL") private _model: Model<Product>) {}

  async findAll(): Promise<Product[]> {
    return this._model.find({
      deletedAt: null
    }).exec();
  }

  async create(payload: ProductDto): Promise<Product> {
    const existingName = await this._model.findOne({
      name: payload.name,
    }).exec();
    if (existingName) {
      throw new BadRequestException(`Product with name "${payload.name}" already exists`);
    }
    const existingCode = await this._model.findOne({
      code: payload.code,
    }).exec();
    if (existingCode) {
      throw new BadRequestException(`Product with code "${payload.code}" already exists`);
    }

    const createdProduct = new this._model({
      ...payload,
      slug: generateSlug(payload.name),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
    return createdProduct.save();
  }

  async findOne(slug: string): Promise<Product> {
    return await this._model.findOne({ slug }).exec().then(product => {
      if (!product) {
        throw new NotFoundException(`Product with slug ${slug} not found`);
      }
      return product;
    })
  }

  async update(slug: string, payload: ProductDto): Promise<Product> {
    const [existingName, existingCode] = await Promise.all([
      this._model.findOne({ name: payload.name }).exec(),
      this._model.findOne({ code: payload.code }).exec(),
  ]);

    if (existingName) {
      throw new BadRequestException(`Product with name "${payload.name}" already exists`);
    }
    if (existingCode) {
      throw new BadRequestException(`Product with code "${payload.code}" already exists`);
    }

    return this._model.findOneAndUpdate({
      slug
    }, {
      $set: payload
    }, {
      new: true
    }).exec().then(product => {
      if (!product) {
        throw new NotFoundException(`Product with slug ${slug} not found`);
      }
      return product;
    });
  }

  async delete(slug: string): Promise<Product> {
    return this._model.findOneAndUpdate({
      slug
    }, {
      $set: {
        deletedAt: new Date(),
      }
    }, {
      new: true
    }).exec();
  }
}
