import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authenticate, requireAdmin } from "../middlewares/authentication";
import {
  adminCreateUserSchema,
  updateUserSchema,
} from "../validations/userValidation";
import { validateBody, validateId } from "../middlewares/validator";

const router = Router();

// Tüm user route'ları için authentication gerekli
router.use(authenticate);

// Get user profile
router.get("/me", UserController.getProfile);

// Get all users (admin only)
router.get("/", requireAdmin, UserController.getUsers);

// Get user by id (admin only)
router.get("/:id", requireAdmin, validateId, UserController.getUserById);

// Create user (admin only)
router.post(
  "/",
  requireAdmin,
  validateBody(adminCreateUserSchema),
  UserController.adminCreateUser
);

// Update user
router.patch("/me", validateBody(updateUserSchema), UserController.updateUser);

// Update user by id (admin only)
router.patch(
  "/:id",
  requireAdmin,
  validateId,
  validateBody(updateUserSchema),
  UserController.updateUserById
);

// Delete user
router.delete("/me", UserController.deleteUser);

// Delete user by id (admin only)
router.delete("/:id", requireAdmin, validateId, UserController.deleteUserById);

export default router;
