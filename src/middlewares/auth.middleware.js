import jwt from "jsonwebtoken";

import AppError from "../utils/AppError.js";

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    next(new AppError("Unauthorized", 401));
    return;
  }

  const token = header.split(" ")[1];

  if (!token) {
    next(new AppError("Unauthorized", 401));
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.sub };
    next();
  } catch (error) {
    next(new AppError("Invalid or expired token.", 401));
  }
}

export default authMiddleware;
