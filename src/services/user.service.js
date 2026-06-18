import UserRepository from "../repositories/user.repository.js";
import AppError from "../utils/AppError.js";

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
}

export default new UserService();
