import mongoose from "mongoose";
const schema=new mongoose.Schema({
    razorpay_order_id:{
        type:String,
        required:true,
    },
    razorpay_Payment_id:{
        type:String,
        required:true,
    },
    razorpay_Signature:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});
export const Payment=mongoose.model('Payment',schema);