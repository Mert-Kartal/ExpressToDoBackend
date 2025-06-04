import { Request, Response, NextFunction } from "express";
import { TodoService } from "../services/todoService";
import { successResponse } from "../utils/response";

export class StatsController {
  static async getTodoStats(req: Request, res: Response, next: NextFunction) {
    try {
      const stats = await TodoService.getTodoStats();
      res.status(200).json(successResponse(stats));
    } catch (error) {
      next(error);
    }
  }

  static async getPriorityStats(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const stats = await TodoService.getPriorityStats();
      res.status(200).json(successResponse(stats));
    } catch (error) {
      next(error);
    }
  }
}
