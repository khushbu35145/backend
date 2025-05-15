// routes/payment.js
import express from 'express';
import { checkout, verifyPayment } from '../controller/payment.js'
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/checkout/:id', isAuth, checkout);
router.post('/verify/:id', isAuth, verifyPayment);

export default router;
