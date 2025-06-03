import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(1, "name is required").max(100, "name is too long"),
    username: z
      .string()
      .min(1, "username is required")
      .max(100, "username is too long"),
    password: z
      .string()
      .min(8, "password is too short")
      .max(16, "password is too long"),
    verifyPassword: z
      .string()
      .min(8, "password is too short")
      .max(16, "password is too long"),
  })
  .refine((data) => data.password === data.verifyPassword, {
    message: "Passwords don't match",
    path: ["verifyPassword"],
  });

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "username is required")
    .max(100, "username is too long"),
  password: z
    .string()
    .min(8, "password is too short")
    .max(16, "password is too long"),
});
