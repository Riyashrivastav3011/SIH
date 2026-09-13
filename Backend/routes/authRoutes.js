import express from 'express'
import {createuser , loginuser , verifyotp} from '../controllers/authController.js'

const router = express.Router();

router.post('/signup', createuser);
router.post('/login' , loginuser);
router.post('/verify' , verifyotp);
export default router;