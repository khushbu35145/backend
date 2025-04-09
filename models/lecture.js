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
    video:{
        type:String,
        require:true,
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"courses",
        require:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})
export const Lecture=mongoose.model("Lecture",schema)