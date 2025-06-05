import { CategoryRepository } from "../repositories/categoryRepository";
import { CreateCategoryData, UpdateCategoryData } from "../model/categoryType";
import { AppError } from "../utils/AppError";

export class CategoryService {
  static async getCategories() {
    return await CategoryRepository.getCategories();
  }

  static async getCategory(id: string) {
    const category = await CategoryRepository.getCategory(id);
    if (!category) {
      throw new AppError("Category not found", 404);
    }
    return category;
  }

  static async getCategoryTodos(id: string) {
    await this.getCategory(id);
    return await CategoryRepository.getCategoryTodos(id);
  }

  static async createCategory(data: CreateCategoryData) {
    return await CategoryRepository.createCategory(data);
  }

  static async updateCategory(id: string, data: UpdateCategoryData) {
    const category = await CategoryRepository.updateCategory(id, data);
    if (!category) {
      throw new AppError("Category not found", 404);
    }
    return category;
  }

  static async deleteCategory(id: string) {
    const result = await CategoryRepository.deleteCategory(id);
    if (!result) {
      throw new AppError("Category not found", 404);
    }
    return result;
  }
}
