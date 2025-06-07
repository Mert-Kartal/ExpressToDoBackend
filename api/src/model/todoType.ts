import { z } from "zod";
import {
  createTodoSchema,
  updateTodoSchema,
  todoSchema,
} from "../validations/todoValidation";
import { Todo, Category } from "@prisma/client";

export type CreateTodoData = z.infer<typeof createTodoSchema>;
export type UpdateTodoData = z.infer<typeof updateTodoSchema>;
export type TodoData = Todo & {
  categories: {
    categoryId: string;
    Category: Category;
  }[];
};
