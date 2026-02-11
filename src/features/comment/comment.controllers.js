import { ApplicationError } from "../../errorHanding/error.handing.js";
import {
  addComment,
  deleteComment,
  getComment,
  updateComment,
} from "./comment.repository.js";

export default class CommentController {
  async addComment(req, res, next) {
    try {
      const content = req.body.content;
      const userId = req.user._id;
      const postId = req.params.postId;
      const comment = await addComment(userId, postId, content);
      if (!comment.success) {
        return next(new ApplicationError(comment.error.msg, comment.error.msg));
      }
      res.status(201).json({
        success: comment.success,
        res: comment.res,
      });
    } catch (err) {
      next(err);
    }
  }

  async getCommentById(req, res, next) {
    try {
      const postId = req.params.postId;
      const comments = await getComment(postId);
      if (!comments.success) {
        return next(
          new ApplicationError(comments.error.msg, comments.error.statusCode),
        );
      }
      res.status(200).json({
        success: comments.success,
        msg: `${postId} posted comment got it successfully.`,
        res: comments.res,
      });
    } catch (err) {
      next(err);
    }
  }

  async updateCommentById(req, res, next) {
    try {
      const id = req.params.commentId;
      const content = req.body?.content ?? null;
      const comment = await updateComment(id, content);
      if (!comment.success) {
        return next(
          new ApplicationError(comment.error.msg, comment.error.statusCode),
        );
      }
      res.status(200).json({
        success: comment.success,
        msg: "Comment updated successfully.",
        res: comment.res,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteCommentById(req, res, next) {
    try {
      const id = req.params.commentId;
      const comment = await deleteComment(id);
      if (!comment.success) {
        return next(
          new ApplicationError(comment.error.msg, comment.error.statusCode),
        );
      }
      res.status(200).json({
        success: comment.success,
        msg: "Comment is deleted successfully.",
        res: comment.res,
      });
    } catch (err) {
      next(err);
    }
  }

  // createComment(req, res) {
  //     const postId = parseInt(req.params.postId);
  //     const userId = req.userId;
  //     const content = req.body.content;
  //     const result = CommentModel.addComment(userId, postId, content);
  //     res.status(200).json({success: true, meg: result});
  // }

  // getComment(req, res) {
  //     const postId = parseInt(req.params.postId);
  //     const result = CommentModel.getByPostId(postId);
  //     if (!result) {
  //         return res.status(404).json({ success: false, msg: 'Post is not found' });
  //     }
  //     res.status(200).json({ success: true, msg: result });
  // }

  // deleteComment(req, res) {
  //     const commentId = parseInt(req.params.commentId);
  //     const result = CommentModel.deleteByCommentId(commentId);
  //     if (!result) {
  //         return res.status(404).json({ success: false, msg: 'Comment is not found' });
  //     }
  //     res.status(200).json({ success: true, msg: 'Comment is deleted successfully' });
  // }

  // updateCommnet(req, res) {
  //     const commentId = parseInt(req.params.commentId);
  //     const content = req.body.content;
  //     const result = CommentModel.updateByCommentId(commentId, content);
  //     if (!result) {
  //         return res.status(404).json({ success: false, msg: 'Comment is not found' });
  //     }
  //     res.status(200).json({ success: true, msg: result });
  // }
}
