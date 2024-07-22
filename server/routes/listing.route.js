import express from 'express'
const router = express.Router();
import { createListing } from '../controllers/listing.controller.js'
import { VerifyToken } from '../utils/VerfiyUser.js';

router.post('/create', VerifyToken, createListing)
export default router;