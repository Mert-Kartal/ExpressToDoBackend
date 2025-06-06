import { NextFunction, Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError";
import { errorResponse } from "../utils/response";
import logger from "../utils/logger";

export const errorHandler = (
  error: Error | AppError | ZodError | PrismaClientKnownRequestError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // AppError handling
  if (error instanceof AppError) {
    const response = errorResponse(error.message);
    logger.error("Application error", {
      errorType: "APP_ERROR",
      message: error.message,
      statusCode: error.statusCode,
      path: req.originalUrl,
      method: req.method,
      response,
    });
    res.status(error.statusCode).json(response);
    return;
  }

  // Zod validation error
  if (error instanceof ZodError) {
    const response = errorResponse("Validation error", error.errors);
    logger.error("Validation error", {
      errorType: "VALIDATION_ERROR",
      errors: error.errors,
      path: req.originalUrl,
      method: req.method,
      response,
    });
    res.status(422).json(response);
    return;
  }

  // Prisma error
  if (error instanceof PrismaClientKnownRequestError) {
    logger.error("Database error", {
      errorType: "DATABASE_ERROR",
      code: error.code,
      message: error.message,
      path: req.originalUrl,
      method: req.method,
    });

    switch (error.code) {
      case "P2002":
        const response1 = errorResponse("Unique constraint violation");
        logger.error("Database error - Unique constraint", {
          errorType: "DATABASE_ERROR",
          code: error.code,
          response: response1,
        });
        res.status(400).json(response1);
        return;
      case "P2025":
        const response2 = errorResponse("Record not found");
        logger.error("Database error - Not found", {
          errorType: "DATABASE_ERROR",
          code: error.code,
          response: response2,
        });
        res.status(404).json(response2);
        return;
      default:
        const response3 = errorResponse("Database error");
        logger.error("Database error - Unknown", {
          errorType: "DATABASE_ERROR",
          code: error.code,
          response: response3,
        });
        res.status(500).json(response3);
        return;
    }
  }

  // Default error
  const response = errorResponse("Internal server error");
  logger.error("Internal server error", {
    errorType: "UNKNOWN_ERROR",
    message: error.message,
    stack: error.stack,
    path: req.originalUrl,
    method: req.method,
    response,
  });
  res.status(500).json(response);
  return;
};

// 404 handler
export const notFoundHandler = (req: Request, res: Response) => {
  const response = errorResponse(`Route ${req.originalUrl} not found`);
  logger.error("Route not found", {
    errorType: "NOT_FOUND",
    path: req.originalUrl,
    method: req.method,
    response,
  });
  res.status(404).json(response);
};
