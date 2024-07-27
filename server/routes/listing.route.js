import express from 'express'
const router = express.Router();
import { createListing, deleteListing } from '../controllers/listing.controller.js'
import { verifyToken } from '../utils/VerfiyUser.js';

router.post('/create', verifyToken, createListing)
router.delete('/delete/:id', verifyToken, deleteListing)
export default router;