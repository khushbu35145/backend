import { instance } from "../index.js";
import { Courses } from "../models/courses.js";
import { Lecture } from "../models/lecture.js";
import { User } from "../models/user.js";
import tryCatch from "../tryCatch.js";
import crypto from 'crypto';
import { Payment } from '../models/payment.js'

export const getAllCourses=tryCatch(async(req,res)=>{
    const courses=await Courses.find()
    res.json({
        courses,
    })
});
export const getSingleCourse=tryCatch(async(req,res)=>{
    const course=await Courses.findById(req.params.id)
    res.json({
        course,
    })
})
export const fetchLectures=tryCatch(async(req,res)=>{
    const lectures=await Lecture.find({course:req.params.id})
    const user=await User.findById(req.user._id)
    if(user.role==='admin'){
        return res.json({lectures})
    }
    if(!user.subscription.includes(req.params.id)) return res.status(400)({
        message:"You have not subscripted to this course",
    })
    res.json({lectures})

})
export const fetchLecture=tryCatch(async(req,res)=>{
    const lecture=await Lecture.findById(req.params.id)
    const user=await User.findById(req.user._id)
    if(user.role==='admin'){
        return res.json({lecture})
    }
    if(!user.subscription.includes(req.params.id)) return res.status(400)({
        message:"You have not subscripted to this course",
    })
    res.json({lecture})

});
export const getMyCourses=tryCatch(async(req,res)=>{
    const courses=await Courses.find({_id:req.user.subscription})
    res.json({
        courses,
    })
})
// export const checkout=tryCatch(async(req,res)=>{
//     const user= await User.findById(req.user._id)
//     const course=await Courses.findById(req.params.id)
//     if(user.subscription.includes(course.id)){
//         return res.status(401).json({
//             message:"You already have this course"
//            })
//     }
//     const options={
//         amount:Number(course.price * 100),
//         currency:"INR",
//     };
//     const order=await instance.orders.create(options);
//     res.status(201).json({
//         course,
//         order,

//     })
// })
// export const checkout = tryCatch(async (req, res) => {
//     const user = await User.findById(req.user._id);
//     const course = await Courses.findById(req.params.id);

//     if (!course) {
//         return res.status(404).json({ message: "Course not found" });
//     }

//     if (!course.price || typeof course.price !== "number") {
//         return res.status(400).json({ message: "Invalid course price" });
//     }

//     if (user.subscription.includes(course._id.toString())) {
//         return res.status(401).json({
//             message: "You already have this course",
//         });
//     }

//     const options = {
//         amount: Number(course.price * 100),
//         currency: "INR",
//     };

//     try {
//         const order = await instance.orders.create(options);
//         res.status(201).json({
//             course,
//             order,
//         });
//     } catch (error) {
//         console.error("Razorpay order creation error:", error);
//         res.status(500).json({ message: "Razorpay order failed" });
//     }
// });

// export const paymentVerification = tryCatch(async (req, res) => {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
//     const body = razorpay_order_id + '|' + razorpay_payment_id;
//     const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
//       .update(body)
//       .digest("hex");
  
//     const isAuthentic = expectedSignature === razorpay_signature;
  
//     if (isAuthentic) {
//       await Payment.create({
//         razorpay_order_id,
//         razorpay_payment_id,
//         razorpay_signature
//       });
  
//       const user = await User.findById(req.user._id);
//       const course = await Courses.findById(req.params.id); // ✅ Not _id
  
//       user.subscription.push(course._id);
//       await user.save();
  
//       res.status(200).json({
//         message: "Course Purchased Successfully"
//       });
  
//     } else {
//       res.status(400).json({
//         message: "Payment Failed"
//       });
//     }
//   });
  