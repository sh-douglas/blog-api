import { User } from "../models/index.js";

class UserRepository {
  async create(data) {
    return User.create(data);
  }

  async findByEmail(email) {
    return User.findOne({ where: { email } });
  }
}

export default new UserRepository();
