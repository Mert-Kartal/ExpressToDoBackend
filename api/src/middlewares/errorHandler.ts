import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  error: CustomError | ZodError | PrismaClientKnownRequestError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Sunucu hatası oluştu";
  let errors: any[] = [];

  // Zod validation hatası
  if (error instanceof ZodError) {
    statusCode = 400;
    message = "Doğrulama hatası";
    errors = error.errors.map((err: any) => ({
      field: err.path.join("."),
      message: err.message,
    }));
  }
  // Prisma hatası
  else if (error instanceof PrismaClientKnownRequestError) {
    statusCode = 400;
    
    switch (error.code) {
      case "P2002":
        message = "Bu kayıt zaten mevcut";
        errors = [{ field: "unique", message: "Benzersiz alan ihlali" }];
        break;
      case "P2025":
        statusCode = 404;
        message = "Kayıt bulunamadı";
        break;
      case "P2003":
        message = "İlişkili kayıt bulunamadı";
        break;
      default:
        message = "Veritabanı hatası";
    }
  }
  // Custom error
  else if (error.statusCode) {
    statusCode = error.statusCode;
    message = error.message;
  }
  // Genel hata
  else {
    message = error.message || "Bilinmeyen hata";
  }

  // Hata yanıtını döndür
  res.status(statusCode).json({
    status: "error",
    message,
    ...(errors.length > 0 && { errors }),
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
};

// 404 handler
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    status: "error",
    message: `${req.originalUrl} endpoint'i bulunamadı`,
  });
};
