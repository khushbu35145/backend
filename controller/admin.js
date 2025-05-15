import { Courses } from "../models/courses.js";
import { Lecture } from "../models/lecture.js";
import tryCatch from "../tryCatch.js";
import {rm, unlinkSync} from 'fs';
import path from "path";
import {promisify} from 'util';
import fs from 'fs'
import { User } from "../models/user.js";

export const createCourse = tryCatch(async (req, res) => {
    console.log("📥 Request body:", req.body);
    console.log("🖼️ Uploaded file:", req.file);

    const { title, description, category, createdBy, duration, price } = req.body;
    const image = req.file;

    if (!image) {
        console.log("🚫 No file uploaded!");
        return res.status(400).json({ message: "Image is required" });
    }

    try {
        console.log("📚 Creating course in DB...");
        await Courses.create({
            title,
            description,
            category,
            createdBy,
            image: image.path,
            duration,
            price,
        });
        console.log("✅ Course created");
        res.status(201).json({ message: "Course Created Successfully" });
    } catch (dbError) {
        console.error("❌ DB Error:", dbError);
        throw dbError;
    }
});


export const addLecture=tryCatch(async(req,res)=>{
    const course=await Courses.findOne(req.params.id)
    if(!course) return res.status(404).json({
        message:"No course with this ID"
     })
     const {title,description}=req.body
const file=req.file
const lecture= await Lecture.create({
    title,
    description,
    video:file?.path,
    course:course._id,

});
res.status(201).json({
    message:"Lecture Add Successfully",
    lecture,
})
});

export const deleteLecture=tryCatch(async(req,res)=>{
    const lecture=await Lecture.findById(req.params.id)
    rm(lecture.video,()=>{
        console.log("Video Deleted")
    });
    await lecture.deleteOne()
    res.json({message:"Lecture Deleted"})
})
const unLinkAsync=promisify(fs.unlink)
export const deleteCourse=tryCatch(async(req,res)=>{
    const course=await Courses.findById(req.params.id)
    const lectures=await Lecture.find({course:course._id})
    await Promise.all(
        lectures.map(async(lecture)=>{
        await unLinkAsync(lecture.video)
        console.log("Video Deleted")
        })
    );
    rm(course.image,()=>{
        console.log("image deleted")
    });
    await Lecture.find({course:req.params.id}).deleteMany()
    await User.updateMany({},{$pull:{subscription:req.params.id}})
    res.json({
        message:"Course Deleted"
    })

});
export const getAllStats=tryCatch(async(req,res)=>{
    const totalCourse=(await Courses.find()).length
    const totalLectures=(await Courses.find()).length
    const totalUsers=(await User.find()).length
    const stats={
        totalCourse,
        totalLectures,
        totalUsers,
    };
    res.json({
        stats,
    })
})