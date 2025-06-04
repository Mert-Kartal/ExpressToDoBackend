import { Router } from "express";
import { validateBody, validateId } from "../middlewares/validator";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validations/categoryValidation";
import { CategoryController } from "../controllers/categoryController";

const router = Router();

// Create a new category
router.post(
  "/",
  validateBody(createCategorySchema),
  CategoryController.createCategory
);

// Get all categories
router.get("/", CategoryController.getCategories);

// Get a specific category by ID
router.get("/:id", validateId, CategoryController.getCategory);

// Update a category
router.patch(
  "/:id",
  validateId,
  validateBody(updateCategorySchema),
  CategoryController.updateCategory
);

// Delete a category
router.delete("/:id", validateId, CategoryController.deleteCategory);

// Get all todos of a category
router.get("/:id/todos", validateId, CategoryController.getCategoryTodos);

export default router;
