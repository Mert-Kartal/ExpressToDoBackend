import { z } from "zod";
import { signUpSchema } from "../validations/authValidation";

// Database model type without verifyPassword
export type CreateUserData = Omit<
  z.infer<typeof signUpSchema>,
  "verifyPassword"
>;
