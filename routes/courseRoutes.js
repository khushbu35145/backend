
import express from "express";
import {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../controller/courseController.js";

const router = express.Router();

router.get("/", getCourses);
router.post("/", addCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;

