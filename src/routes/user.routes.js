import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import checkRoleMiddleware from "../middlewares/role.middleware.js";

const router = Router();

router.get("/me", authMiddleware, UserController.getUserData);
router.patch(
  "/:id/role",
  authMiddleware,
  checkRoleMiddleware(["director"]),
  UserController.updateUserRole,
);
router.get(
  "/",
  authMiddleware,
  checkRoleMiddleware(["director"]),
  UserController.findAllUsers,
);

export default router;
