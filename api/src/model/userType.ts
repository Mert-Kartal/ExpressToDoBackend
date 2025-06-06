import { z } from "zod";
import { signUpSchema } from "../validations/authValidation";
import {
  adminCreateUserSchema,
  updateUserSchema,
  userSchema,
} from "../validations/userValidation";

// Kullanıcı rolleri
export enum Roles {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type UserRole = keyof typeof Roles;

// Yeni kullanıcı oluşturma verisi
export type CreateUserData = Omit<
  z.infer<typeof signUpSchema>,
  "verifyPassword"
> & {
  role?: UserRole;
};

export type AdminCreateUserData = z.infer<typeof adminCreateUserSchema>;
// Kullanıcı güncelleme verisi
export type UpdateUserData = z.infer<typeof updateUserSchema>;

// Kullanıcı verisi
export type UserData = z.infer<typeof userSchema>;
