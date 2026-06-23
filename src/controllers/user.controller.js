import UserService from "../services/user.service.js";

class UserController {
  async getUserData(req, res, next) {
    try {
      const userId = req.user.id;
      const user = await UserService.getAuthenticatedUser(userId);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateUserRole(req, res, next) {
    try {
      const userToUpdate = req.params.id;

      const updatedUser = await UserService.updateUserRole(
        userToUpdate,
        req.body,
      );
      return res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async findAllUsers(req, res, next) {
    try {
      const users = await UserService.findAllUsers(req.user);

      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
