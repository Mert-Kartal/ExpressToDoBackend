import { UserRepository } from "../repositories/userRepository";
import { CreateUserData, UpdateUserData } from "../types/userType";

export class UserService {
  static async getUsers() {
    try {
      const users = await UserRepository.getUsers();
      return users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async getUser(id: string) {
    try {
      const user = await UserRepository.getUser(id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async createUser(data: CreateUserData) {
    try {
      const newUser = await UserRepository.createUser(data);
      return newUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async updateUser(id: string, data: UpdateUserData) {
    try {
      const user = await UserRepository.updateUser(id, data);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async deleteUser(id: string) {
    try {
      return await UserRepository.deleteUser(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
