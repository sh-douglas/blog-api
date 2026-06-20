import express from "express";
import cors from "cors";

import globalErrorHandler from "./middlewares/global-error.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import manageRoutes from "./routes/manage-post.routes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/manage/posts", manageRoutes);

app.use(globalErrorHandler);

export default app;
