import { Router } from "express";
import { validateBody, validateId } from "../middlewares/validator";
import {
  createTodoSchema,
  updateTodoSchema,
} from "../validations/todoValidation";
import { TodoController } from "../controllers/todoController";

const router = Router();

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

export default router;
