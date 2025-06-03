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
      };
    }
  }
}

// JWT secret key - production'da environment variable'dan alınmalı
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Authentication middleware
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Authorization header'ını kontrol et
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({
        status: "error",
        message: "Yetkilendirme token'ı gerekli",
      });
    }

    // Bearer token formatını kontrol et
    const token = authHeader.split(" ")[1]; // "Bearer TOKEN" formatından TOKEN'ı al
    
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Geçerli token formatı: Bearer <token>",
      });
    }

    // JWT token'ı doğrula
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    
    // Kullanıcının hala var olup olmadığını kontrol et
    const user = await UserRepository.getUser(decoded.userId);
    
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Kullanıcı bulunamadı",
      });
    }

    // Kullanıcı bilgilerini request'e ekle
    req.user = {
      id: user.id,
      username: user.username,
      name: user.name,
    };

    next();
  } catch (error) {
    // JWT hatası
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        status: "error",
        message: "Geçersiz token",
      });
    }
    
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        status: "error",
        message: "Token süresi dolmuş",
      });
    }

    // Diğer hatalar
    next(error);
  }
};

// Optional authentication - token varsa doğrula, yoksa devam et
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return next(); // Token yoksa devam et
  }

  // Token varsa authenticate middleware'ini çalıştır
  return authenticate(req, res, next);
};

// Admin kontrolü için middleware (gelecekte kullanılabilir)
export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Önce authentication kontrolü yapılmalı
  if (!req.user) {
    return res.status(401).json({
      status: "error",
      message: "Kimlik doğrulama gerekli",
    });
  }

  // Admin kontrolü burada yapılabilir
  // Şu an için basit bir kontrol
  next();
};
