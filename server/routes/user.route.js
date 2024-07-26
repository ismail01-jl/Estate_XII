import express from 'express'
const router = express.Router();
import { test, updateuser , deleteuser , getUserListings } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/VerfiyUser.js';


router.get('/test', test)
router.post('/update/:id', verifyToken, updateuser)
router.delete('/delete/:id', verifyToken, deleteuser)
router.get('/listings/:id', verifyToken , getUserListings)
export default router;