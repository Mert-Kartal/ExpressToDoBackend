import { Router } from "express";
import { validateBody, validateId } from "../middlewares/validator";
import { authenticate, requireAdmin } from "../middlewares/authentication";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validations/categoryValidation";
import { CategoryController } from "../controllers/categoryController";

const router = Router();
router.use(authenticate);
// Public routes - only authentication required
router.get("/", CategoryController.getCategories);
router.get("/:id", validateId, CategoryController.getCategory);
router.get("/:id/todos", validateId, CategoryController.getCategoryTodos);

// Admin only routes
router.post(
  "/",
  requireAdmin,
  validateBody(createCategorySchema),
  CategoryController.createCategory
);

router.patch(
  "/:id",
  requireAdmin,
  validateId,
  validateBody(updateCategorySchema),
  CategoryController.updateCategory
);

router.delete(
  "/:id",
  requireAdmin,
  validateId,
  CategoryController.deleteCategory
);

export default router;
