import express from 'express';
import PostController from './post.controllers.js';
import { upload } from '../../middlewares/fileUpload.js';

const postController = new PostController();

const postRoputer = express.Router();

postRoputer.post('/', upload.single('imageUrl'), postController.createPost);
postRoputer.get('/all', postController.getPosts);
postRoputer.get("/user/:userId", postController.getPostByUserId);
postRoputer.get('/:postId', postController.getPostById);
postRoputer.put('/:postId', upload.single('imageUrl'), postController.updatePost);
postRoputer.delete('/:postId', postController.deletePost);


export default postRoputer;