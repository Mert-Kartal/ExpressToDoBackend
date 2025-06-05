import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authenticate } from "../middlewares/authentication";
import { updateUserSchema } from "../validations/userValidation";
import { validateBody } from "../middlewares/validator";

const router = Router();

// Tüm user route'ları için authentication gerekli
router.use(authenticate);

// Get all users
router.get("/", UserController.getUsers);

// Get user profile
router.get("/me", UserController.getProfile);

// Update user
router.patch("/me", validateBody(updateUserSchema), UserController.updateUser);

// Delete user
router.delete("/me", UserController.deleteUser);

export default router;
