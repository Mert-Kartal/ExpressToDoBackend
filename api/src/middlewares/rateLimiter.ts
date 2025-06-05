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
  windowMs: 60 * 60 * 1000, // 1 saat
  max: 5, // IP başına maksimum istek sayısı
  message: {
    status: "error",
    message:
      "Too many login requests, please try again in 1 hour or contact the admin.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
