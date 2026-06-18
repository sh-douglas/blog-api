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
}

export default new PostController();
