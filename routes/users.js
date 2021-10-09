import express from 'express';

import { signinUser, signupUser } from '../controllers/usersController';

const router = express.Router();

router.post('/signin', signinUser);
router.post('/signup', signupUser);

export default router;