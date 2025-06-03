import prisma from "../config/db";
import {
  CreateCategoryData,
  UpdateCategoryData,
  CategoryData,
} from "../types/categoryType";

export class CategoryRepository {
  static async getCategories(): Promise<CategoryData[]> {
    try {
      return await prisma.category.findMany();
    } catch (error) {
      throw error;
    }
  }

  static async getCategory(id: string): Promise<CategoryData | null> {
    try {
      return await prisma.category.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async createCategory(data: CreateCategoryData): Promise<CategoryData> {
    try {
      return await prisma.category.create({
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateCategory(
    id: string,
    data: UpdateCategoryData
  ): Promise<CategoryData> {
    try {
      return await prisma.category.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  static async deleteCategory(id: string): Promise<CategoryData> {
    try {
      return await prisma.category.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async getCategoryTodos(id: string) {
    try {
      return await prisma.todoCategory.findMany({
        where: {
          categoryId: id,
        },
        include: {
          Todo: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
