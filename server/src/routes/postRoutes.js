import express from 'express';
import { createPost, getAllPosts, getPostById } from '../controllers/postController.js';

const router = express.Router();

router.post('/create-post', createPost);
router.get('/posts', getAllPosts);
router.get('/post/:id', getPostById);

export default router;