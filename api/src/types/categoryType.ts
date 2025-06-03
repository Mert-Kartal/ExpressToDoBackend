import { z } from "zod";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validations/categoryValidation";

export type CreateCategoryData = z.infer<typeof createCategorySchema>;
export type UpdateCategoryData = z.infer<typeof updateCategorySchema>;
