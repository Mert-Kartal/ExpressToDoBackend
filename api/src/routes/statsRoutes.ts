import { Router } from "express";
import { StatsController } from "../controllers/statsController";
import { authenticate } from "../middlewares/authentication";
const router = Router();

router.use(authenticate);
router.get("/todo", StatsController.getTodoStats);
router.get("/priority", StatsController.getPriorityStats);

export default router;
