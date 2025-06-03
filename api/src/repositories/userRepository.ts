import prisma from "../config/db";
import { CreateUserData, UpdateUserData, UserData } from "../model/userType";

export class UserRepository {
  static async getUsers(): Promise<UserData[]> {
    try {
      return await prisma.user.findMany({ where: { deletedAt: null } });
    } catch (error) {
      throw error;
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
      throw error;
    }
  }

  static async createUser(data: CreateUserData): Promise<UserData> {
    try {
      return await prisma.user.create({
        data,
      });
    } catch (error) {
      throw error;
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
      throw error;
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
      throw error;
    }
  }
}
