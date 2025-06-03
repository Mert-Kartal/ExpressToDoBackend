import { z } from "zod";
import { signUpSchema } from "../validations/authValidation";
import { updateUserSchema, userSchema } from "../validations/userValidation";

export type CreateUserData = Omit<
  z.infer<typeof signUpSchema>,
  "verifyPassword"
>;

export type UpdateUserData = z.infer<typeof updateUserSchema>;

export type UserData = z.infer<typeof userSchema>;
