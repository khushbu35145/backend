// controllers/paymentController.js
import { instance } from '../razorpay.js';
import Course from '../models/course.js';
import { User } from '../models/user.js';

export const checkout = async (req, res) => {
  const course = await Courses.findById(req.params.id);
  const user = await User.findById(req.user._id);

  if (!course) return res.status(404).json({ message: "Course not found" });
  if (user.subscription.includes(course._id.toString()))
    return res.status(400).json({ message: "Already subscribed" });

  const options = {
    amount: course.price * 100,
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  res.status(201).json({ course, order });
};
import crypto from 'crypto';
import { Payment } from '../models/payment.js'; // Create this model


export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature)
    return res.status(400).json({ message: "Payment verification failed" });

  // Save Payment Record
  await Payment.create({ razorpay_order_id, razorpay_payment_id, razorpay_signature });

  // Add course to user's subscription
  const user = await User.findById(req.user._id);
  const course = await Courses.findById(req.params.id);
  user.subscription.push(course._id);
  await user.save();

  res.status(200).json({ message: "Course Purchased Successfully" });
};
