import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/authService";
import { CreateUserData } from "../model/userType";
import { successResponse } from "../utils/response";

export class AuthController {
  static async signUp(
    req: Request<{}, {}, CreateUserData>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = req.body;
      const { user, token } = await AuthService.createUser(data);
      res
        .status(201)
        .json(successResponse({ user, token }, "User created successfully"));
    } catch (error) {
      next(error);
    }
  }

  static async login(
    req: Request<{}, {}, { username: string; password: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { username, password } = req.body;
      const { user, token } = await AuthService.validateUser(
        username,
        password
      );
      res
        .status(200)
        .json(successResponse({ user, token }, "User signed in successfully"));
    } catch (error) {
      next(error);
    }
  }
}
