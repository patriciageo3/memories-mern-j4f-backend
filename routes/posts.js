import express from 'express';

import withAuthenticationInfo from '../middleware/withAuthenticationInfo.js';
import { getPosts, createPost, updatePost, deletePost, updateLikeCount } from '../controllers/postsController.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/new', withAuthenticationInfo, createPost);
router.patch('/:id', withAuthenticationInfo, updatePost);
router.delete('/:id', withAuthenticationInfo, deletePost);
router.patch('/:id/update-likes', withAuthenticationInfo, updateLikeCount);

export default router;