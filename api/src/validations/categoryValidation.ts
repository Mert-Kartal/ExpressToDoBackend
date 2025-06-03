import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "name is required").max(100, "name is too long"),
  color: z.string().min(4, "color is required").max(7, "color is too long"),
});

export const updateCategorySchema = createCategorySchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const categorySchema = createCategorySchema.extend({
  id: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
});
