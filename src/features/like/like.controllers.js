import { ApplicationError } from "../../errorHanding/error.handing.js";
import { getLikes, toggleLike } from "./like.repository.js";

export default class LikeController {
  async toggleLike(req, res, next) {
    try {
      const model = req.body.model;
      const id = req.params.id;
      const userId = req.user._id;
      const like = await toggleLike(userId, model, id);
      res.status(200).json({ success: like.success, msg: like.msg });
    } catch (err) {
      next(err);
    }
  }

  async getLikes(req, res, next) {
    try {
      const id = req.params.id;
      const likes = await getLikes(id);
      if (!likes.success) {
        return next(
          new ApplicationError(likes.error.msg, likes.error.statusCode),
        );
      }
      res.status(200).json({ success: likes.success, res: likes.res });
    } catch (err) {
      next(err);
    }
  }
  // getAllLikes(req, res) {
  //     const postId = parseInt(req.params.postId);
  //     const likeCount = LikeModel.getAllLikes(postId);
  //     res.status(200).json({ postId: postId, likes: likeCount });
  // }

  // toggleLike(req, res) {
  //     const postId = parseInt(req.params.postId);
  //     const userId = req.userId;
  //     const result = LikeModel.toggleLike(userId, postId);
  //     res.status(200).json(result);
  // }
}
