import PostRepository from "../repositories/post.repository.js";
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
}

export default new PostService();
