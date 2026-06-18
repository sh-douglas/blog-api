import { Post } from "../models/index.js";

class PostRepository {
  async create(data) {
    return Post.create(data);
  }

  async findAll() {
    return Post.findAll({
      order: [["createdAt", "DESC"]],
    });
  }

  async findById(id) {
    return Post.findByPk(id);
  }
}

export default new PostRepository();
