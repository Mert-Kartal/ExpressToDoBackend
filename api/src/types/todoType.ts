import { z } from "zod";
import {
  createTodoSchema,
  updateTodoSchema,
} from "../validations/todoValidation";

export type CreateTodoData = z.infer<typeof createTodoSchema>;
export type UpdateTodoData = z.infer<typeof updateTodoSchema>;
