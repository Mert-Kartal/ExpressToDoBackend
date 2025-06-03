import { z } from "zod";

export const updateUserSchema = z
  .object({
    name: z
      .string()
      .min(1, "name is required")
      .max(100, "name is too long")
      .optional(),
    username: z
      .string()
      .min(1, "username is required")
      .max(100, "username is too long")
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

// export const changePasswordSchema = z.object({
//   password: z
//     .string()
//     .min(8, "password is too short")
//     .max(16, "password is too long"),
//   verifyPassword: z
//     .string()
//     .min(8, "password is too short")
//     .max(16, "password is too long"),
// });

export const userSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, "name is required").max(100, "name is too long"),
  username: z
    .string()
    .min(1, "username is required")
    .max(100, "username is too long"),
  password: z
    .string()
    .min(8, "password is too short")
    .max(16, "password is too long"),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});
