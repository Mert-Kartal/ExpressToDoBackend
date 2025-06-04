import { UserRepository } from "../repositories/userRepository";
import { CreateUserData, UpdateUserData } from "../model/userType";
import { AppError } from "../utils/AppError";
import bcrypt from "bcrypt";

export class UserService {
  static async getUsers() {
    return await UserRepository.getUsers();
  }

  static async getUser(id: string) {
    const user = await UserRepository.getUser(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  static async getUserByEmail(username: string) {
    const user = await UserRepository.getUserByUsername(username);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  static async createUser(data: CreateUserData) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await UserRepository.createUser({
      ...data,
      password: hashedPassword,
    });
  }

  static async updateUser(id: string, data: UpdateUserData) {
    const user = await UserRepository.updateUser(id, data);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  static async deleteUser(id: string) {
    const result = await UserRepository.deleteUser(id);
    if (!result) {
      throw new AppError("User not found", 404);
    }
    return result;
  }

  static async validateUser(username: string, password: string) {
    const user = await UserRepository.getUserByUsername(username);
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new AppError("Invalid email or password", 401);
    }

    return user;
  }
}
