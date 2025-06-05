import { z } from "zod";
import { signUpSchema } from "../validations/authValidation";
import { updateUserSchema, userSchema } from "../validations/userValidation";

// Kullanıcı rolleri
export type UserRole = "ADMIN" | "USER";

// Yeni kullanıcı oluşturma verisi
export type CreateUserData = Omit<
  z.infer<typeof signUpSchema>,
  "verifyPassword"
>;

// Kullanıcı güncelleme verisi
export type UpdateUserData = z.infer<typeof updateUserSchema>;

// Kullanıcı verisi
export type UserData = z.infer<typeof userSchema>;
