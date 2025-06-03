import { z } from "zod";
import {
  createTodoSchema,
  updateTodoSchema,
  todoSchema,
} from "../validations/todoValidation";

export type CreateTodoData = z.infer<typeof createTodoSchema>;
export type UpdateTodoData = z.infer<typeof updateTodoSchema>;
export type TodoData = z.infer<typeof todoSchema>;
