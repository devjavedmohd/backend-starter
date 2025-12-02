import express from 'express';
import { createPost, getPosts } from '../controllers/postController.js';
import { auth, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', auth, getPosts);
router.post('/', auth, authorize('USER', 'ADMIN'), createPost); // only USER or ADMIN can create

export default router;
