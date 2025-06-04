import { NextFunction, Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError";
import { errorResponse } from "../utils/response";

export const errorHandler = (
  error: Error | AppError | ZodError | PrismaClientKnownRequestError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", error);

  // AppError handling
  if (error instanceof AppError) {
    return res.status(error.statusCode).json(errorResponse(error.message));
  }

  // Zod validation error
  if (error instanceof ZodError) {
    return res
      .status(400)
      .json(errorResponse("Validation error", error.errors));
  }

  // Prisma error
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return res
          .status(400)
          .json(errorResponse("Unique constraint violation"));
      case "P2025":
        return res.status(404).json(errorResponse("Record not found"));
      default:
        return res.status(500).json(errorResponse("Database error"));
    }
  }

  // Default error
  return res.status(500).json(errorResponse("Internal server error"));
};

// 404 handler
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json(errorResponse(`Route ${req.originalUrl} not found`));
};
