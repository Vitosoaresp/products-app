import mongoose from "mongoose";
import { z } from "zod";

export const productSchema = z
  .object({
    name: z.string().min(2),
    code: z.number().int().positive(),
    price: z.number().positive(),
    description: z.string().nullish(),
    category: z.string().nullish(),
    quantity: z.number().int().positive().default(0).nullish(),
  }).required();

export type ProductDto = z.infer<typeof productSchema>;

export interface Product extends ProductDto {
  _id: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  slug: string;
}

export const ProductMongooseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  description: { type: String },
  code: { type: Number, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String },
  quantity: { type: Number, default: 0 },
  deletedAt: { type: Date },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});
