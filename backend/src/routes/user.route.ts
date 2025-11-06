import express from 'express';
import {   getAllUsers,deleteUserByAdmin, getCurrentUser, getUserById } from '../controllers/user/user.controller';
import { aurthorize } from '../middleware/authorize.middleware';
import { verifyToken } from '../middleware/auth.middleware';
const router = express.Router();

router.get('/',verifyToken,aurthorize(['admin']),getAllUsers);
router.get('/:id',verifyToken,aurthorize(['admin']) ,getUserById);
router.delete("/:id",verifyToken,aurthorize(['admin']) ,deleteUserByAdmin);
router.get('/me', getCurrentUser);


export default router;