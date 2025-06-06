import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const start = Date.now();

  // Request detaylarını logla
  logger.info("Incoming request", {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });

  // Response tamamlandığında çalışacak fonksiyon
  res.on("finish", () => {
    const duration = Date.now() - start;

    // Response body'sini yakala
    const responseBody = res.locals.responseBody || {};

    const logData = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get("user-agent"),
      requestBody: req.body,
      responseBody: responseBody,
      headers: {
        authorization: req.headers.authorization
          ? "Bearer [REDACTED]"
          : undefined,
        ...req.headers,
      },
    };

    // Tüm istekleri logla
    logger.info("Request completed", logData);
  });

  // Response body'sini yakalamak için orijinal json metodunu sakla
  const originalJson = res.json;
  res.json = function (body) {
    res.locals.responseBody = body;
    return originalJson.call(this, body);
  };

  // Hata durumlarını yakala
  res.on("error", (error) => {
    logger.error("Request error", {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      error: error.message,
      stack: error.stack,
      errorType: "RESPONSE_ERROR",
    });
  });

  next();
};

export default requestLogger;
