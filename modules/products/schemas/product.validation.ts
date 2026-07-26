import { z } from "zod";

export const productSchema = z.object({
  title: z
    .string()
    .min(3)
    .max(120),

  slug: z
    .string()
    .min(3)
    .max(120),

  description: z
    .string()
    .min(20),

  category: z
    .string()
    .min(2),

  image: z
    .string()
    .min(1),

  filePath: z
    .string()
    .min(1),

  badge: z
    .string()
    .default("New"),

  price: z
    .number()
    .positive(),
});