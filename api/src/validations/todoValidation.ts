import { Priority, Status } from ".prisma/client";
import { z } from "zod";

export const createTodoSchema = z.object({
  userId: z.string().min(1, "userId is required"),
  title: z.string().min(1, "title is required").max(100, "title is too long"),
  description: z.string().min(1, "description is required").max(500).optional(),
  priority: z.nativeEnum(Priority),
  dueDate: z.date().min(new Date(), "dueDate is required"),
});

export const updateTodoSchema = z
  .object({
    status: z.nativeEnum(Status).optional(),
  })
  .merge(createTodoSchema.partial())
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const todoSchema = createTodoSchema.extend({
  id: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
});
