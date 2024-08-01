import express from 'express';
import { test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken ,updateUser); //first we are verifying and if we done verifying going to update

export default router;