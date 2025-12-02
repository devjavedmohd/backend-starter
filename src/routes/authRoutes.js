import express from 'express'
import { register, login, profile, posts } from '../controllers/authController.js'
import { auth } from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/register', register);
router.post('/login', login)

router.get('/profile', auth, profile);

export default router;