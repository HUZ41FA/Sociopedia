import express from 'express';
import { login } from '../controllers/auth.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);

export default router;