import { Post } from "../models/index.js";

class PostRepository {
  async create(data) {
    return Post.create(data);
  }
}

export default new PostRepository();
