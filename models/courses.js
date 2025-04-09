import mongoose from "mongoose";
const schema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        require:true,
    },
    image:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true,
    },
    duration:{
        type:Number,
        require:true,
    },
    category:{
        type:String,
        required:true,
    },
    createBy:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
export const Courses=mongoose.model("Courses",schema)