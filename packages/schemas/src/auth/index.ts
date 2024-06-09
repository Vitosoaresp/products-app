import { z } from "zod";
import { User } from "../user";

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(6),
});

export type Signin = z.infer<typeof signinSchema>;
export type Register = z.infer<typeof registerSchema>;

export interface SigninResponse {
  token: string;
  user: User;
}