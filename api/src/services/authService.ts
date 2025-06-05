import { UserRepository } from "../repositories/userRepository";
import { CreateUserData } from "../model/userType";
import { AppError } from "../utils/AppError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const jwt_key = process.env.JWT_SECRET_KEY!;

export class AuthService {
  static async createUser(data: CreateUserData) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await UserRepository.createUser({
      ...data,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user.id }, jwt_key);

    return { user, token };
  }

  static async validateUser(username: string, password: string) {
    const user = await UserRepository.getUserByUsername(username);

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = jwt.sign({ id: user.id }, jwt_key);

    return { user, token };
  }
}
