import express from 'express';
import { deleteUser, getUserListings, test, updateUser,getUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken ,updateUser); //first we are verifying and if we done verifying going to update
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListings);  //show the listings.id is of the user
router.get('/:id', verifyToken, getUser);

export default router;