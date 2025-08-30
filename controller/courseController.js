// import Course from '../models/course.js';

// // Create course
// const createCourse = async (req, res) => {
//   try {
//     const course = new Course(req.body);
//     await course.save();
//     res.status(201).json({ success: true, course });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// // Get all courses
// const getCourses = async (req, res) => {
//   try {
//     const courses = await Course.find();
//     res.json({ success: true, courses });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Update course
// const updateCourse = async (req, res) => {
//   try {
//     const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!course) {
//       return res.status(404).json({ success: false, message: 'Course not found' });
//     }
//     res.json({ success: true, course });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// // Delete course
// const deleteCourse = async (req, res) => {
//   try {
//     const course = await Course.findByIdAndDelete(req.params.id);
//     if (!course) {
//       return res.status(404).json({ success: false, message: 'Course not found' });
//     }
//     res.json({ success: true, message: 'Course deleted' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


import Course from "../models/course.js";

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json({ courses });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

// Add a new course
export const addCourse = async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json({ message: "Course added", course: newCourse });
  } catch (err) {
    res.status(400).json({ error: "Failed to add course" });
  }
};

// Update course
export const updateCourse = async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Course not found" });
    res.status(200).json({ message: "Course updated", course: updated });
  } catch (err) {
    res.status(400).json({ error: "Failed to update course" });
  }
};

// Delete course
export const deleteCourse = async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Course not found" });
    res.status(200).json({ message: "Course deleted" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete course" });
  }
};

