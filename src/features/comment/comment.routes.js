import express from 'express';
import CommentController from './comment.controllers.js';



const commentRouter = express.Router();

const commentController = new CommentController();

commentRouter.post('/:postId', commentController.addComment);
commentRouter.get('/:postId', commentController.getCommentById);
commentRouter.put('/:commentId', commentController.updateCommentById);
commentRouter.delete('/:commentId', commentController.deleteCommentById);

// commentRouter.post('/:postId', (req, res) => commentController.createComment(req, res));
// commentRouter.get('/:postId', (req, res) => commentController.getComment(req, res));
// commentRouter.delete('/:commentId', (req, res) => commentController.deleteComment(req, res));
// commentRouter.put('/:commentId', (req, res) => commentController.updateCommnet(req, res));

export default commentRouter;
