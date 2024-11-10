import { z, ZodType } from "zod";

export class UserValidation {
  // membuat validasi form register dengan zod
  static readonly REGISTER: ZodType = z.object({
    username: z.string().min(3).max(100),
    password: z.string().min(3).max(100),
    name: z.string().min(3).max(100),
  });

  // membuat validasi form login dengan zod
  static readonly LOGIN: ZodType = z.object({
    username: z.string().min(3).max(100),
    password: z.string().min(3).max(100),
  });
}
