import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/userService";
import {
  UpdateUserData,
  CreateUserData,
  AdminCreateUserData,
} from "../model/userType";
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

  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await UserService.getUser(id);
      res.status(200).json(successResponse(user));
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

  static async createUser(
    req: Request<{}, {}, CreateUserData>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = req.body;
      const user = await UserService.createUser(data);
      res.status(201).json(successResponse(user));
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

  static async updateUserById(
    req: Request<{ id: string }, {}, UpdateUserData>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
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

  static async deleteUserById(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      await UserService.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static async adminCreateUser(
    req: Request<{}, {}, AdminCreateUserData>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = req.body;
      const user = await UserService.adminCreateUser(data);
      res.status(201).json(successResponse(user));
    } catch (error) {
      next(error);
    }
  }
}
