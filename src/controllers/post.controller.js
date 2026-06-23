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

  async findUnpublishedPosts(req, res, next) {
    try {
      const posts = await PostService.findUnpublishedPosts(req.user);

      return res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }

  async findUnpublishedPostById(req, res, next) {
    try {
      const post = await PostService.findUnpublishedPostById(
        req.params.id,
        req.user,
      );

      return res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }

  updatePublishedStatus(published) {
    return async function (req, res, next) {
      try {
        const updatedPost = await PostService.updatePublishedStatus(
          req.params.id,
          req.user,
          published,
        );

        return res.status(200).json(updatedPost);
      } catch (error) {
        next(error);
      }
    };
  }

  async updatePost(req, res, next) {
    try {
      const updatedPost = await PostService.updatePost(
        req.params.id,
        req.user,
        req.body,
      );

      return res.status(200).json(updatedPost);
    } catch (error) {
      next(error);
    }
  }

  async deletePost(req, res, next) {
    try {
      const { id } = req.params;
      const user = req.user;

      const deletedPost = await PostService.deletePost(id, user);

      return res.status(200).json(deletedPost);
    } catch (error) {
      next(error);
    }
  }

  async findManagedPublishedPosts(req, res, next) {
    try {
      const publishedPosts = await PostService.findManagedPublishedPosts(
        req.user,
      );

      return res.status(200).json(publishedPosts);
    } catch (error) {
      next(error);
    }
  }
}

export default new PostController();
