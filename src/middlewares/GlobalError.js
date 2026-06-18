import { ZodError } from "zod";
import AppError from "../utils/AppError.js";

function globalErrorHandler(error, req, res, next) {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ error: error.message });
    return;
  } else if (error instanceof ZodError) {
    const firstIssue = error.issues[0];
    res.status(400).json({ error: firstIssue?.message || "Invalid fields." });
    return;
  }
  res.status(500).json({
    error: "An error occurred with your request. Please try again.",
  });
}

export default globalErrorHandler;
