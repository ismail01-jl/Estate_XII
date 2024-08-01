import express from 'express'
const router = express.Router();
import { createListing, getListings , getSearchListing ,deleteListing , updateListing } from '../controllers/listing.controller.js'
import { verifyToken } from '../utils/VerfiyUser.js';

router.post('/create', verifyToken, createListing)
router.delete('/delete/:id', verifyToken, deleteListing)
router.put('/update/:id', verifyToken, updateListing )
router.get('/getListing/:id', getListings)
router.get('/get', getSearchListing)
export default router;