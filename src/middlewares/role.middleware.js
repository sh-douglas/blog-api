import UserService from "../services/user.service.js";
import AppError from "../utils/AppError.js";

function checkRoleMiddleware(allowedRoles) {
  return async function (req, res, next) {
    try {
      const { id } = req.user;
      const userData = await UserService.getAuthenticatedUser(id);

      if (!allowedRoles.includes(userData.role)) {
        next(new AppError("Forbidden", 403));
        return;
      }
      return next();
    } catch (error) {
      next(error);
    }
  };
}

export default checkRoleMiddleware;
