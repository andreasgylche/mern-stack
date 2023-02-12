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
router.get('/:id', verifyToken, getUser);

/* UPDATE */
router.patch('/:id', verifyToken, updateUser);
router.patch('/:id/:followId', verifyToken, addRemoveFollower);

/* DELETE */
router.delete('/:id', verifyToken, deleteUser);

export default router;
