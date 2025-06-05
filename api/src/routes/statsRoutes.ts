import { Router } from "express";
import { StatsController } from "../controllers/statsController";

const router = Router();

router.get("/todo", StatsController.getTodoStats);
router.get("/priority", StatsController.getPriorityStats);

export default router;
