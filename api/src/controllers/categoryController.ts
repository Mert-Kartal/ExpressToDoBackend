import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../services/categoryService";
import { CreateCategoryData, UpdateCategoryData } from "../model/categoryType";
import { successResponse } from "../utils/response";

export class CategoryController {
  static async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await CategoryService.getCategories();
      res.status(200).json(successResponse(categories));
    } catch (error) {
      next(error);
    }
  }

  static async getCategory(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      const category = await CategoryService.getCategory(id);
      res.status(200).json(successResponse(category));
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryTodos(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      const todos = await CategoryService.getCategoryTodos(id);
      res.status(200).json(successResponse(todos));
    } catch (error) {
      next(error);
    }
  }

  static async createCategory(
    req: Request<{}, {}, CreateCategoryData>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = req.body;
      const category = await CategoryService.createCategory(data);
      res
        .status(201)
        .json(successResponse(category, "Category created successfully"));
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory(
    req: Request<{ id: string }, {}, UpdateCategoryData>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      const data = req.body;
      const category = await CategoryService.updateCategory(id, data);
      res
        .status(200)
        .json(successResponse(category, "Category updated successfully"));
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      await CategoryService.deleteCategory(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
