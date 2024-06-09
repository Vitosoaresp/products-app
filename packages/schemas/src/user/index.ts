import mongoose from "mongoose";
import { z } from "zod";

export const userSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(2),
    password: z.string().min(6),
  }).required();

export const UserMongooseSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  deletedAt: { type: Date },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});
  
export type UserDto = z.infer<typeof userSchema>;

export interface User extends UserDto {
  _id: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

