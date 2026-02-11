import express from 'express';
import LikeController from './like.controllers.js';


const likeRouter = express.Router();

const likeController = new LikeController();

// likeRouter.get('/:postId', (req, res) => likeController.getAllLikes(req, res));
likeRouter.post('/toggle/:id', likeController.toggleLike);
likeRouter.get('/:id', likeController.getLikes);

export default likeRouter;