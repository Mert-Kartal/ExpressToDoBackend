import { Router } from "express";
import { validateBody, validateId } from "../middlewares/validator";
import { authenticate } from "../middlewares/authentication";
import {
  createTodoSchema,
  updateTodoSchema,
} from "../validations/todoValidation";
import { TodoController } from "../controllers/todoController";

const router = Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Get all todos
router.get("/", TodoController.getTodos);

// Search todos
router.get("/search", TodoController.searchTodos);

// Get a single todo by id
router.get("/:id", validateId, TodoController.getTodo);

// Create a new todo
router.post("/", validateBody(createTodoSchema), TodoController.createTodo);

// Update a todo
router.put(
  "/:id",
  validateId,
  validateBody(updateTodoSchema),
  TodoController.updateTodo
);

// Update todo status
router.patch("/:id/status", validateId, TodoController.updateTodoStatus);

// Delete a todo
router.delete("/:id", validateId, TodoController.deleteTodo);

// Get todo categories
router.get("/:id/categories", validateId, TodoController.getTodoCategories);

// Create todo category
router.post("/:id/categories", validateId, TodoController.createTodoCategory);

// Delete todo category
router.delete("/:id/categories", validateId, TodoController.deleteTodoCategory);

export default router;
