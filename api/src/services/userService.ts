import { UserRepository } from "../repositories/userRepository";
import { UpdateUserData } from "../model/userType";
import { AppError } from "../utils/AppError";

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
}
