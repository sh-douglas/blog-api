import AuthService from "../services/auth.service.js";

class AuthController {
  async register(req, res, next) {
    try {
      const newUser = await AuthService.register(req.body);

      return res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
