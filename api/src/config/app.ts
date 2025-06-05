import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler, notFoundHandler } from "../middlewares/errorHandler";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes

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
