import express from 'express';
import { deleteUser, test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken ,updateUser); //first we are verifying and if we done verifying going to update
router.delete('/delete/:id', verifyToken, deleteUser);

export default router;