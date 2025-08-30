import express from 'express';
import { loginUser, myProfile, register, verifyUser } from '../controller/user.js';
import { isAuth } from '../middleware/auth.js';
import { resendOtp } from "../controller/user.js";
import { getAllUsers } from '../controller/user.js';
const router = express.Router();
router.get('/user/all', isAuth, getAllUsers);
router.post('/user/register', register); // Define the route
router.post('/user/verify',verifyUser);
router.post('/user/login',loginUser);
router.get('/user/me',isAuth,myProfile);
router.post("/resend-otp", resendOtp);



export default router;
