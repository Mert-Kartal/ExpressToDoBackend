import prisma from "../config/db";
import {
  CreateCategoryData,
  UpdateCategoryData,
  CategoryData,
} from "src/types/categoryType";

export class CategoryRepository {
  async getCategories(): Promise<CategoryData[]> {
    return await prisma.category.findMany();
  }

  async getCategory(id: string): Promise<CategoryData | null> {
    return await prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  async createCategory(data: CreateCategoryData): Promise<CategoryData> {
    return await prisma.category.create({
      data,
    });
  }

  async updateCategory(
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

  async deleteCategory(id: string): Promise<CategoryData> {
    return await prisma.category.delete({
      where: {
        id,
      },
    });
  }

  async getCategoryTodos(id: string) {
    return await prisma.todoCategory.findMany({
      where: {
        categoryId: id,
      },
      include: {
        Todo: true,
      },
    });
  }
}
