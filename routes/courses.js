import express from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controller/courses.js"; // adjust path

const router = express.Router();

// Routes
router.post("/new", createCourse);     // Create
router.get("/", getCourses);           // Read all
router.get("/:id", getCourseById);     // Read single
router.put("/:id", updateCourse);      // Update
router.delete("/:id", deleteCourse);   // Delete

export default router;
