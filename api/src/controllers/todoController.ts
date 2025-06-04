import { Request, Response, NextFunction } from "express";
import { TodoService } from "../services/todoService";
import { CreateTodoData, UpdateTodoData } from "../model/todoType";
import { Status } from "@prisma/client";
import { successResponse } from "../utils/response";

export class TodoController {
  static async getTodos(req: Request, res: Response, next: NextFunction) {
    try {
      const todos = await TodoService.getTodos();
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
      const todo = await TodoService.getTodo(id);
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
      const todo = await TodoService.createTodo(data);
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
      const todo = await TodoService.updateTodo(id, data);
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
      const todo = await TodoService.updateTodoStatus(id, status);
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
      await TodoService.deleteTodo(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static async searchTodos(
    req: Request<{}, {}, {}, { query: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { query } = req.query;
      const todos = await TodoService.searchTodos(query);
      res.status(200).json(successResponse(todos));
    } catch (error) {
      next(error);
    }
  }
}
