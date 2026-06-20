import PostRepository from "../repositories/post.repository.js";
import AppError from "../utils/AppError.js";
import {
  createPostSchema,
  updatePostSchema,
} from "../validators/post.validator.js";

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

  async findPublishedPosts() {
    const posts = await PostRepository.findPublishedPosts();

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

  async findPublishedPostById(id) {
    const post = await PostRepository.findPublishedPostById(id);

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

  async findUnpublishedPosts(currentUser) {
    let posts;

    if (currentUser.role === "director") {
      posts = await PostRepository.findUnpublishedPosts();
    } else if (currentUser.role === "editor") {
      posts = await PostRepository.findUnpublishedPostsByAuthor(currentUser.id);
    } else {
      throw new AppError("Forbidden.", 403);
    }

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

  async findUnpublishedPostById(id, currentUser) {
    let post;

    if (currentUser.role === "director") {
      post = await PostRepository.findUnpublishedPostById(id);
    } else if (currentUser.role === "editor") {
      post = await PostRepository.findUnpublishedPostByIdAndAuthor(
        id,
        currentUser.id,
      );
    } else {
      throw new AppError("Forbidden.", 403);
    }

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

  async updatePublishedStatus(postId, currentUser, published) {
    let post;

    if (currentUser.role === "director") {
      post = await PostRepository.findById(postId);
    } else if (currentUser.role === "editor") {
      post = await PostRepository.findByIdAndAuthor(postId, currentUser.id);
    } else {
      throw new AppError("Forbidden.", 403);
    }

    if (!post) {
      throw new AppError("Post not found.", 404);
    }

    const updatedPost = await PostRepository.updatePublishedStatus(
      postId,
      published,
    );

    return {
      id: updatedPost.id,
      title: updatedPost.title,
      content: updatedPost.content,
      authorId: updatedPost.authorId,
      published: updatedPost.published,
      createdAt: updatedPost.createdAt,
      updatedAt: updatedPost.updatedAt,
    };
  }

  async updatePost(postId, currentUser, data) {
    let post;
    const cleanData = updatePostSchema.parse(data);

    if (currentUser.role === "director") {
      post = await PostRepository.findById(postId);
    } else if (currentUser.role === "editor") {
      post = await PostRepository.findByIdAndAuthor(postId, currentUser.id);
    } else {
      throw new AppError("Forbidden.", 403);
    }

    if (!post) {
      throw new AppError("Post not found.", 404);
    }

    const updatedPost = await PostRepository.updatePost(postId, cleanData);

    return {
      id: updatedPost.id,
      title: updatedPost.title,
      content: updatedPost.content,
      authorId: updatedPost.authorId,
      published: updatedPost.published,
      createdAt: updatedPost.createdAt,
      updatedAt: updatedPost.updatedAt,
    };
  }

  async deletePost(postId, currentUser) {
    let post;
    if (currentUser.role === "director") {
      post = await PostRepository.findById(postId);
    } else if (currentUser.role === "editor") {
      post = await PostRepository.findByIdAndAuthor(postId, currentUser.id);
    } else {
      throw new AppError("Forbidden.", 403);
    }

    if (!post) {
      throw new AppError("Post not found.", 404);
    }

    await PostRepository.deletePost(postId);

    return { message: "Post deleted successfully." };
  }
}

export default new PostService();
