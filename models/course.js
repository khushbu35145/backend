// import mongoose from 'mongoose';

// const courseSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   category: String,
//   price: Number,
//   duration: String,
//   description: String,
//   image: String,
// }, { timestamps: true });

// const Course = mongoose.model('Course', courseSchema);

// export default Course;
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  price: { type: String, required: true },
  oldPrice: { type: String },
  duration: { type: String, required: true },
  label: { type: String },
  image: { type: String, required: true },
}, { timestamps: true });

const Course= mongoose.model("Course", courseSchema);
export default Course;


