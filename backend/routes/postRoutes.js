import express from 'express';
import { getFeedPosts, getUserPosts, likePost } from '../controllers/posts.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/", authenticate, getFeedPosts);
router.get("/:userId/posts", authenticate, getUserPosts);
router.patch("/:id/like", authenticate, likePost);


export default router;