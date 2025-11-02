import express from 'express';
import {   getAllUsers,deleteUserByAdmin, getCurrentUser, getUserById } from '../controllers/user/user.controller';
const router = express.Router();

router.get('/me', getCurrentUser);
router.get('/getAllUsers', getAllUsers);
router.get('/getUser/:id', getUserById);
router.delete("delete", deleteUserByAdmin)



export default router;