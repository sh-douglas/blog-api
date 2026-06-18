import { Post } from "../models/index.js";

class PostRepository {
  async create(data) {
    return Post.create(data);
  }

  async findPublishedPosts() {
    return Post.findAll({
      where: { published: true },
      order: [["createdAt", "DESC"]],
    });
  }

  async findPublishedPostById(id) {
    return Post.findOne({
      where: {
        id,
        published: true,
      },
    });
  }

  async findUnpublishedPostById(id) {
    return Post.findOne({
      where: {
        id,
        published: false,
      },
    });
  }

  async findUnpublishedPosts() {
    return Post.findAll({
      where: { published: false },
      order: [["createdAt", "DESC"]],
    });
  }

  async findUnpublishedPostsByAuthor(authorId) {
    return Post.findAll({
      where: {
        published: false,
        authorId,
      },
      order: [["createdAt", "DESC"]],
    });
  }

  async findUnpublishedPostByIdAndAuthor(id, authorId) {
    return Post.findOne({
      where: {
        id,
        published: false,
        authorId,
      },
    });
  }
}

export default new PostRepository();
