import { ApplicationError } from "../../errorHanding/error.handing.js";
import {
  createPost,
  deletePostById,
  getAllPosts,
  getPost,
  getUserPost,
  updatePost,
} from "./post.repository.js";

export default class PostController {
  async createPost(req, res, next) {
    try {
      const { caption } = req.body;
      const userId = req.user._id;
      const imageUrl = req.file.path;
      const newPost = await createPost(userId, caption, imageUrl);
      if (!newPost.success) {
        return next(
          new ApplicationError(newPost.error.msg, newPost.error.statusCode),
        );
      }
      res.status(201).json({
        success: true,
        msg: "Post is created successfully.",
        res: newPost.res,
      });
    } catch (err) {
      next(err);
    }
  }

  async getPostById(req, res, next) {
    try {
      const id = req.params.postId;
      const post = await getPost(id);
      if (!post.success) {
        return next(
          new ApplicationError(post.error.msg, post.error.statusCode),
        );
      }
      res.status(200).json({
        success: post.success,
        msg: `${id} post details retrieved successfully.`,
        res: post.res,
      });
    } catch (err) {
      next(err);
    }
  }

  async getPosts(req, res, next) {
    try {
      const posts = await getAllPosts();
      if (!posts.success) {
        return next(
          new ApplicationError(posts.error.msg, posts.error.statusCode),
        );
      }
      res.status(200).json({
        success: posts.success,
        msg: "Posts are retrieved successfully ",
        res: posts.res,
      });
    } catch (err) {
      next(err);
    }
  }

  async getPostByUserId(req, res, next) {
    try {
      const userId = req.params.userId;
      const posts = await getUserPost(userId);
      if (!posts.success) {
        return next(new ApplicationError(posts.error.msg, posts.error.statusCode));
      }
      res.status(200).json({ success: posts.success, res: posts.res });
    } catch (err) {
      next(err);
    }
  }

  async updatePost(req, res, next) {
    try {
      const id = req.params.postId;
      const caption = req.body?.caption ?? null;
      const imageUrl = req.file?.path ?? null;
      const updatedPost = await updatePost(id, caption, imageUrl);
      if (!updatedPost.success) {
        return next(
          new ApplicationError(
            updatedPost.error.msg,
            updatedPost.error.statusCode,
          ),
        );
      }
      res.status(200).json({
        success: updatedPost.success,
        msg: `${id} post is updated successfully.`,
        res: updatedPost.res,
      });
    } catch (err) {
      next(err);
    }
  }

  async deletePost(req, res, next) {
    try {
      const id = req.params.postId;
      const post = await deletePostById(id);
      if (!post.success) {
        return next(
          new ApplicationError(post.error.msg, post.error.statusCode),
        );
      }
      res
        .status(200)
        .json({
          success: post.success,
          msg: "Post is deleted successfully.",
          res: post.res,
        });
    } catch (err) {
      next(err);
    }
  }


  
}
