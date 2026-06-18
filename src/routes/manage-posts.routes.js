import { Router } from "express";
import PostController from "../controllers/post.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import checkRoleMiddleware from "../middlewares/role.middleware.js";

const router = Router();

router.get(
  "/",
  authMiddleware,
  checkRoleMiddleware(["editor", "director"]),
  PostController.findUnpublishedPosts,
);

export default router;
