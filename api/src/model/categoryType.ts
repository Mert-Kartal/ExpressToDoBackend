import { z } from "zod";
import {
  createCategorySchema,
  updateCategorySchema,
  categorySchema,
} from "../validations/categoryValidation";

export type CreateCategoryData = z.infer<typeof createCategorySchema>;
export type UpdateCategoryData = z.infer<typeof updateCategorySchema>;
export type CategoryData = z.infer<typeof categorySchema>;
