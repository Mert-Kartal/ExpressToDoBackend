import prisma from "../config/db";
import {
  AdminCreateUserData,
  CreateUserData,
  UpdateUserData,
  UserData,
} from "../model/userType";

export class UserRepository {
  static async getUsers(): Promise<UserData[]> {
    return await prisma.user.findMany({ where: { deletedAt: null } });
  }

  static async getUser(id: string): Promise<UserData | null> {
    return await prisma.user.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        todos: {
          where: {
            deletedAt: null,
          },
        },
      },
    });
  }

  static async getUserByUsername(username: string): Promise<UserData | null> {
    return await prisma.user.findUnique({
      where: {
        username,
        deletedAt: null,
      },
    });
  }

  static async createUser(data: CreateUserData): Promise<UserData> {
    return await prisma.user.create({
      data,
    });
  }

  static async updateUser(id: string, data: UpdateUserData): Promise<UserData> {
    return await prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  static async deleteUser(id: string): Promise<UserData> {
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  static async adminCreateUser(data: AdminCreateUserData): Promise<UserData> {
    return await prisma.user.create({
      data: {
        ...data,
      },
    });
  }
}
