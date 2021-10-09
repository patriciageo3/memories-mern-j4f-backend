import express from 'express';

import { signinUser, signupUser } from '../controllers/usersController.js';

const router = express.Router();

router.post('/signin', signinUser);
router.post('/signup', signupUser);

export default router;