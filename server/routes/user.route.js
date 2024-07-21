import express from 'express'
const router = express.Router();
import { test, updateuser , deleteuser } from '../controllers/user.controller.js'
import { VerifyToken } from '../utils/VerfiyUser.js';


router.get('/test', test)
router.post('/update/:id', VerifyToken, updateuser)
router.delete('/delete/:id', VerifyToken, deleteuser)
export default router;