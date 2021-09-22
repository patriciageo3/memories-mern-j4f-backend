import express from 'express';

import { getPosts, createPost, updatePost, deletePost, updateLikeCount } from '../controllers/postsController.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/new', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

router.patch('/:id/update-likes', updateLikeCount);

export default router;