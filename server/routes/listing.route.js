import express from 'express'
const router = express.Router();
import { createListing } from '../controllers/listing.controller.js'
import { verifyToken } from '../utils/VerfiyUser.js';

router.post('/create', verifyToken, createListing)
export default router;