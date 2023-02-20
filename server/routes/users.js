import express from 'express';
import {
    getUsers,
    getUser,
    updateUser,
    addRemoveFollower,
    deleteUser,
} from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
router.get('/', verifyToken, getUsers);
router.get('/:userId', verifyToken, getUser);

/* UPDATE */
router.patch('/:userId', verifyToken, updateUser);
router.patch('/:userId/:followId', verifyToken, addRemoveFollower);

/* DELETE */
router.delete('/:userId', verifyToken, deleteUser);

export default router;
