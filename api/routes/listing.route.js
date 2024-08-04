import express from 'express';
import { createListing,deleteListing} from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createListing); // verified users can create listings
router.delete('/delete/:id', verifyToken, deleteListing); // this id is the id of that particular listing.

export default router;