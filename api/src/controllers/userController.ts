import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/userService";
import { UpdateUserData } from "../model/userType";
import { successResponse } from "../utils/response";

export class UserController {
  static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getUsers();
      res.status(200).json(successResponse(users));
    } catch (error) {
      next(error);
    }
  }

  static async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.getUser(req.user!.id);
      res.status(200).json(successResponse(user));
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(
    req: Request<{}, {}, UpdateUserData>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.user!.id;
      const data = req.body;
      const user = await UserService.updateUser(id, data);
      res.status(200).json(successResponse(user));
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(
    req: Request<{}, {}, { id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = req.user!.id;
      await UserService.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
