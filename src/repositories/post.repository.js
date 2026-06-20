import { Post, User } from "../models/index.js";

class PostRepository {
  async create(data) {
    return Post.create(data);
  }

  async findById(id) {
    return Post.findByPk(id, {
      include: {
        model: User,
        as: "author",
        attributes: ["id", "name"],
      },
    });
  }

  async updatePost(id, data) {
    await Post.update(data, { where: { id } });

    return this.findById(id);
  }

  async deletePost(id) {
    return Post.destroy({ where: { id } });
  }

  async updatePublishedStatus(id, published) {
    await Post.update(
      { published },
      {
        where: { id },
      },
    );

    return this.findById(id);
  }

  async findByIdAndAuthor(id, authorId) {
    return Post.findOne({
      where: {
        id,
        authorId,
      },
      include: {
        model: User,
        as: "author",
        attributes: ["id", "name"],
      },
    });
  }

  async findPublishedPosts() {
    return Post.findAll({
      where: { published: true },
      order: [["createdAt", "DESC"]],
      include: {
        model: User,
        as: "author",
        attributes: ["id", "name"],
      },
    });
  }

  async findPublishedPostById(id) {
    return Post.findOne({
      where: {
        id,
        published: true,
      },
      include: {
        model: User,
        as: "author",
        attributes: ["id", "name"],
      },
    });
  }

  async findUnpublishedPostById(id) {
    return Post.findOne({
      where: {
        id,
        published: false,
      },
      include: {
        model: User,
        as: "author",
        attributes: ["id", "name"],
      },
    });
  }

  async findUnpublishedPosts() {
    return Post.findAll({
      where: { published: false },
      order: [["createdAt", "DESC"]],
      include: {
        model: User,
        as: "author",
        attributes: ["id", "name"],
      },
    });
  }

  async findUnpublishedPostsByAuthor(authorId) {
    return Post.findAll({
      where: {
        published: false,
        authorId,
      },
      order: [["createdAt", "DESC"]],
      include: {
        model: User,
        as: "author",
        attributes: ["id", "name"],
      },
    });
  }

  async findUnpublishedPostByIdAndAuthor(id, authorId) {
    return Post.findOne({
      where: {
        id,
        published: false,
        authorId,
      },
      include: {
        model: User,
        as: "author",
        attributes: ["id", "name"],
      },
    });
  }
}

export default new PostRepository();
