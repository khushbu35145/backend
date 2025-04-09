// import express from 'express'
// import { register } from '../controller/user.js';

// const router=express.Router();
// router.get('/user/register',register)
// export default router;
import express from 'express';
import { loginUser, myProfile, register, verifyUser } from '../controller/user.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/user/register', register); // Define the route
router.post('/user/verify',verifyUser);
router.post('/user/login',loginUser);
router.get('/user/me',isAuth,myProfile);

export default router;
