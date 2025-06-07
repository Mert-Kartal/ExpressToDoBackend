import prisma from "../config/db";
import {
  CreateCategoryData,
  UpdateCategoryData,
  CategoryData,
} from "../model/categoryType";
import { TodoData } from "../model/todoType";

export class CategoryRepository {
  static async getCategories(): Promise<CategoryData[]> {
    return await prisma.category.findMany();
  }

  static async getCategory(id: string): Promise<CategoryData | null> {
    return await prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  static async createCategory(data: CreateCategoryData): Promise<CategoryData> {
    return await prisma.category.create({
      data,
    });
  }

  static async updateCategory(
    id: string,
    data: UpdateCategoryData
  ): Promise<CategoryData> {
    return await prisma.category.update({
      where: {
        id,
      },
      data,
    });
  }

  static async deleteCategory(id: string): Promise<CategoryData> {
    return await prisma.category.delete({
      where: {
        id,
      },
    });
  }

  static async getCategoryTodos(id: string): Promise<{ Todo: TodoData }[]> {
    return await prisma.todoCategory.findMany({
      where: {
        categoryId: id,
        Todo: {
          deletedAt: null,
        },
      },
      include: {
        Todo: {
          include: {
            categories: {
              include: {
                Category: true,
              },
            },
          },
        },
      },
    });
  }
}
