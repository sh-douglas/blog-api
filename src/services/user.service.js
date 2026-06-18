import UserRepository from "../repositories/user.repository.js";
import AppError from "../utils/AppError.js";

import { updateUserRoleSchema } from "../validators/user.validator.js";

class UserService {
  async getAuthenticatedUser(userId) {
    const user = await UserRepository.findById(userId);

    if (!user) {
      throw new AppError("Unauthorized.", 401);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  async updateUserRole(userId, data) {
    const cleanData = updateUserRoleSchema.parse(data);
    const existingUser = await UserRepository.findById(userId);

    if (!existingUser) {
      throw new AppError("User not found.", 404);
    }

    const updatedUser = await UserRepository.updateRole(userId, cleanData.role);

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    };
  }
}

export default new UserService();
