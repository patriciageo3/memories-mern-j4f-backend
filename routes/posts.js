import express from 'express';

import withAuthenticationCheck from '../middleware/withAuthenticationCheck.js';
import { getPosts, createPost, updatePost, deletePost, updateLikeCount } from '../controllers/postsController.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/new', withAuthenticationCheck, createPost);
router.patch('/:id', withAuthenticationCheck, updatePost);
router.delete('/:id', withAuthenticationCheck, deletePost);
router.patch('/:id/update-likes', withAuthenticationCheck, updateLikeCount);

export default router;