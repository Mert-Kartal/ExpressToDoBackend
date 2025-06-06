import { Router } from "express";
import { StatsController } from "../controllers/statsController";
import { authenticate } from "../middlewares/authentication";
const router = Router();

router.use(authenticate);
router.get("/todos", StatsController.getTodoStats);
router.get("/priorities", StatsController.getPriorityStats);

export default router;
