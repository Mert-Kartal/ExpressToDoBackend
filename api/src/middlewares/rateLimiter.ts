import rateLimit from "express-rate-limit";

// Global rate limiter
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // IP başına maksimum istek sayısı
  message: {
    status: "error",
    message: "Too many requests, please try again later..",
  },
  standardHeaders: true, // RateLimit-* header'larını döndür
  legacyHeaders: false, // X-RateLimit-* header'larını döndürme
});

// Auth rate limiter (login/register için)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 20, // IP başına maksimum istek sayısı
  message: {
    status: "error",
    message:
      "Too many login requests, please try again in 15 minutes or contact the admin.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
