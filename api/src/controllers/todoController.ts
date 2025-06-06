import { Request, Response, NextFunction } from "express";
import { TodoService } from "../services/todoService";
import { CreateTodoData, UpdateTodoData } from "../model/todoType";
import { Status, Priority } from "@prisma/client";
import { successResponse } from "../utils/response";
import { AppError } from "../utils/AppError";

export class TodoController {
  static async getTodos(
    req: Request<
      {},
      {},
      {},
      {
        page?: string;
        limit?: string;
        sort?: string;
        order?: "asc" | "desc";
        status?: Status;
        priority?: Priority;
      }
    >,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {
        page = "1",
        limit = "10",
        sort,
        order = "asc",
        status,
        priority,
      } = req.query;
      const todos = await TodoService.getTodos(req.user!.id, {
        page: parseInt(page),
        limit: Math.min(parseInt(limit), 50),
        sort,
        order,
        status,
        priority,
      });
      res.status(200).json(successResponse(todos));
    } catch (error) {
      next(error);
    }
  }

  static async getTodo(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      const todo = await TodoService.getTodo(id, req.user!.id);
      res.status(200).json(successResponse(todo));
    } catch (error) {
      next(error);
    }
  }

  static async createTodo(
    req: Request<{}, {}, CreateTodoData>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = req.body;
      const todo = await TodoService.createTodo(data, req.user!.id);
      res.status(201).json(successResponse(todo, "Todo created successfully"));
    } catch (error) {
      next(error);
    }
  }

  static async updateTodo(
    req: Request<{ id: string }, {}, UpdateTodoData>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      const data = req.body;
      const todo = await TodoService.updateTodo(id, data, req.user!.id);
      res.status(200).json(successResponse(todo, "Todo updated successfully"));
    } catch (error) {
      next(error);
    }
  }

  static async updateTodoStatus(
    req: Request<{ id: string }, {}, { status: Status }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      const { status } = req.body;
      const todo = await TodoService.updateTodoStatus(id, status, req.user!.id);
      res
        .status(200)
        .json(successResponse(todo, "Todo status updated successfully"));
    } catch (error) {
      next(error);
    }
  }

  static async deleteTodo(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.params.id;
      await TodoService.deleteTodo(id, req.user!.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static async searchTodos(
    req: Request<
      {},
      {},
      {},
      {
        q: string;
        page?: string;
        limit?: string;
        sort?: string;
        order?: "asc" | "desc";
      }
    >,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { q, page = "1", limit = "10", sort, order = "asc" } = req.query;

      if (!q) {
        throw new AppError("Search query is required", 400);
      }

      const todos = await TodoService.searchTodos(q, req.user!.id, {
        page: parseInt(page),
        limit: Math.min(parseInt(limit), 50),
        sort,
        order,
      });
      res.status(200).json(successResponse(todos));
    } catch (error) {
      console.error("Search error:", error);
      next(error);
    }
  }
}
