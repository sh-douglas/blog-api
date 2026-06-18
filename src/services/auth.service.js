import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserRepository from "../repositories/user.repository.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import AppError from "../utils/AppError.js";

class AuthService {
  async register(data) {
    const cleanData = registerSchema.parse(data);
    const existingUser = await UserRepository.findByEmail(cleanData.email);

    if (existingUser) {
      throw new AppError("Email address already registered", 409);
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(cleanData.password, salt);

    const newUser = await UserRepository.create({
      name: cleanData.name,
      email: cleanData.email,
      passwordHash,
      role: "reader",
    });

    const userResponse = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    return userResponse;
  }

  async login(data) {
    const cleanData = loginSchema.parse(data);
    const existingUser = await UserRepository.findByEmail(cleanData.email);

    if (!existingUser) {
      throw new AppError("Invalid credentials.", 401);
    }

    const isValidPassword = await bcrypt.compare(
      cleanData.password,
      existingUser.passwordHash,
    );

    if (!isValidPassword) {
      throw new AppError("Invalid credentials.", 401);
    }

    const token = jwt.sign({ sub: existingUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const user = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
    };

    return {
      user,
      token,
    };
  }
}

export default new AuthService();
