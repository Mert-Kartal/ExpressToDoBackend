import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/userRepository";

// JWT payload interface
interface JwtPayload {
  userId: string;
  username: string;
  iat?: number;
  exp?: number;
}

// Request interface'ini genişlet - user bilgisini ekle
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        username: string;
        name: string;
        role: "ADMIN" | "USER";
      };
    }
  }
}

// JWT secret key - environment variable'dan al
const JWT_SECRET = process.env.JWT_SECRET_KEY || "your-secret-key";

// Authentication middleware
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Authorization header'ını kontrol et
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        status: "error",
        message: "Authorization token required",
      });
      return;
    }

    // Bearer token formatını kontrol et
    const token = authHeader.split(" ")[1]; // "Bearer TOKEN" formatından TOKEN'ı al

    if (!token) {
      res.status(401).json({
        status: "error",
        message: "Valid token format: Bearer <token>",
      });
      return;
    }

    // JWT token'ı doğrula
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Kullanıcının hala var olup olmadığını kontrol et
    const user = await UserRepository.getUser(decoded.userId);

    if (!user) {
      res.status(401).json({
        status: "error",
        message: "User not found",
      });
      return;
    }

    // Kullanıcı bilgilerini request'e ekle
    req.user = {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        status: "error",
        message: "Invalid token",
      });
      return;
    }

    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({
        status: "error",
        message: "Token expired",
      });
      return;
    }

    next(error);
  }
};

// Optional authentication - token varsa doğrula, yoksa devam et
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    next(); // Token yoksa devam et
    return;
  }

  // Token varsa authenticate middleware'ini çalıştır
  await authenticate(req, res, next);
};

// Admin kontrolü için middleware
export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Önce authentication kontrolü yapılmalı
  if (!req.user) {
    res.status(401).json({
      status: "error",
      message: "Authentication required",
    });
    return;
  }

  // Admin kontrolü
  if (req.user.role !== "ADMIN") {
    res.status(403).json({
      status: "error",
      message: "Admin privileges required for this operation",
    });
    return;
  }

  next();
};
