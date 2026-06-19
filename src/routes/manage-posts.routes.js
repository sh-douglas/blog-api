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

router.get(
  "/:id",
  authMiddleware,
  checkRoleMiddleware(["editor", "director"]),
  PostController.findUnpublishedPostById,
);

router.patch(
  "/:id/publish",
  authMiddleware,
  checkRoleMiddleware(["editor", "director"]),
  PostController.updatePublishedStatus(true),
);
router.patch(
  "/:id/unpublish",
  authMiddleware,
  checkRoleMiddleware(["editor", "director"]),
  PostController.updatePublishedStatus(false),
);

export default router;
