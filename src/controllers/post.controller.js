import PostService from "../services/post.service.js";

class PostController {
  async create(req, res, next) {
    try {
      const newPost = await PostService.create(req.body, req.user.id);

      return res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  }

  async findPublishedPosts(req, res, next) {
    try {
      const posts = await PostService.findPublishedPosts();

      return res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }

  async findPublishedPostById(req, res, next) {
    try {
      const post = await PostService.findPublishedPostById(req.params.id);

      return res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }
}

export default new PostController();
