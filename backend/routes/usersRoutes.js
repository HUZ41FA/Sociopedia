import express from 'express';
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from '../controllers/users.js';
import { authenticate } from '../middleware/authMiddleware.js'

const router = express.Router();

router.get('/:id', authenticate, getUser);
router.get('/:id/friends', authenticate, getUserFriends);
router.patch('/:id/:friendId', authenticate, addRemoveFriend);


export default router;