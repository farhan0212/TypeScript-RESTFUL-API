import { z, ZodType } from "zod";

export class ContactValidation {
  static readonly CREATE: ZodType = z.object({
    first_name: z.string().min(3).max(100),
    last_name: z.string().min(3).max(100).optional(),
    email: z.string().email("Must Email").optional(),
    phone: z.string().min(9).max(15).optional(),
  });
}
