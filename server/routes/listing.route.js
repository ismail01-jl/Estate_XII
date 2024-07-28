import express from 'express'
const router = express.Router();
import { createListing, deleteListing , updateListing } from '../controllers/listing.controller.js'
import { verifyToken } from '../utils/VerfiyUser.js';

router.post('/create', verifyToken, createListing)
router.delete('/delete/:id', verifyToken, deleteListing)
router.put('/update/:id', verifyToken, updateListing )
export default router;