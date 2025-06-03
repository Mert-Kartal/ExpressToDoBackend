import { CategoryRepository } from "../repositories/CategoryRepository";
import { CreateCategoryData, UpdateCategoryData } from "../types/categoryType";
export class CategoryService {
  static async getCategories() {
    try {
      return await CategoryRepository.getCategories();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async getCategory(id: string) {
    try {
      const category = await CategoryRepository.getCategory(id);
      if (!category) {
        throw new Error("Category not found");
      }
      return category;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async createCategory(data: CreateCategoryData) {
    try {
      return await CategoryRepository.createCategory(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async updateCategory(id: string, data: UpdateCategoryData) {
    try {
      const category = await CategoryRepository.updateCategory(id, data);
      if (!category) {
        throw new Error("Category not found");
      }
      return category;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async deleteCategory(id: string) {
    try {
      return await CategoryRepository.deleteCategory(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
