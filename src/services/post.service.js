import PostRepository from "../repositories/post.repository.js";
import AppError from "../utils/AppError.js";
import { createPostSchema } from "../validators/post.validator.js";

class PostService {
  async create(data, authorId) {
    const cleanData = createPostSchema.parse(data);

    const postData = {
      title: cleanData.title,
      content: cleanData.content,
      authorId,
    };

    const newPost = await PostRepository.create(postData);

    return {
      id: newPost.id,
      title: newPost.title,
      content: newPost.content,
      authorId: newPost.authorId,
      published: newPost.published,
      createdAt: newPost.createdAt,
    };
  }

  async findAll() {
    const posts = await PostRepository.findAll();

    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.authorId,
      published: post.published,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));
  }

  async findById(id) {
    const post = await PostRepository.findById(id);

    if (!post) {
      throw new AppError("Post not found.", 404);
    }

    return {
      id: post.id,
      title: post.title,
      content: post.content,
      authorId: post.authorId,
      published: post.published,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  }
}

export default new PostService();
