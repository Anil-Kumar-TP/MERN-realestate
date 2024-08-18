import express from 'express';
import { createListing,deleteListing,updateListing,getListing} from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createListing); // verified users can create listings
router.delete('/delete/:id', verifyToken, deleteListing); // this id is the id of that particular listing.
router.post('/update/:id', verifyToken, updateListing); // id of that listing
router.get('/get/:id', getListing); // automatically get the info of that listing based on id and then only update.

export default router;