
import express from "express";
import { addUniversityToCourse, getUniversitiesByCourse, deleteUniversityFromCourse , updateUniversityInCourse,getAllCourses} from "../controller/collegeCourseController.js";

const router = express.Router();

// Admin
router.post("/add", addUniversityToCourse);
router.delete("/:courseName/:universityId", deleteUniversityFromCourse);
router.put("/:courseName/:universityId", updateUniversityInCourse);  // ✏️ Edit
router.get("/all", getAllCourses);

// User
router.get("/:courseName", getUniversitiesByCourse);

export default router;
