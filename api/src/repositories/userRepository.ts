import prisma from "../config/db";
import { CreateUserData, UpdateUserData, UserData } from "../types/userType";

export class UserRepository {
  static async getUsers(): Promise<UserData[]> {
    try {
      return await prisma.user.findMany({ where: { deletedAt: null } });
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    }
  }

  static async getUser(id: string): Promise<UserData | null> {
    try {
      return await prisma.user.findUnique({
        where: {
          id,
          deletedAt: null,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    }
  }

  static async createUser(data: CreateUserData): Promise<UserData> {
    try {
      return await prisma.user.create({
        data,
      });
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    }
  }
  static async updateUser(id: string, data: UpdateUserData): Promise<UserData> {
    try {
      return await prisma.user.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    }
  }

  static async deleteUser(id: string): Promise<UserData> {
    try {
      return await prisma.user.update({
        where: {
          id,
        },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error((error as Error).message);
    }
  }
}
