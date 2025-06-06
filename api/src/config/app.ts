import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler, notFoundHandler } from "../middlewares/errorHandler";
import { globalLimiter, authLimiter } from "../middlewares/rateLimiter";
import requestLogger from "../middlewares/requestLogger";
import todoRoutes from "../routes/todoRoutes";
import statsRoutes from "../routes/statsRoutes";
import categoryRoutes from "../routes/categoryRoutes";
import authRouter from "../routes/authRoutes";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(globalLimiter);
app.use(requestLogger);

// Root route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// API Routes
app.use("/api/todos", todoRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authLimiter, authRouter);

// 404 handler - must be after all routes
app.use(notFoundHandler);

// Error handler - must be the last middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    errorHandler(err, req, res, next);
  }
);

export default app;
