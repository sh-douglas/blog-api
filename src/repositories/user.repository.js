import { User } from "../models/index.js";

class UserRepository {
  async create(data) {
    return User.create(data);
  }

  async findByEmail(email) {
    return User.findOne({ where: { email } });
  }

  async findById(id) {
    return User.findByPk(id);
  }

  async updateRole(userId, role) {
    await User.update({ role: role }, { where: { id: userId } });

    return this.findById(userId);
  }
}

export default new UserRepository();
