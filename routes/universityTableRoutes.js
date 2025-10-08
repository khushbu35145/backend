// import express from "express";
// import {
//   createUniversity,
//   getUniversities,
//   getUniversityById,
//   updateUniversity,
//   deleteUniversity,
// } from "../controller/universityTableController.js";

// const router = express.Router();

// router.post("/", createUniversity);
// router.get("/", getUniversities);
// router.get("/:id", getUniversityById);
// router.put("/:id", updateUniversity);
// router.delete("/:id", deleteUniversity);

// export default router;
import express from "express";
import {
  addUniversity,
  getAllCourses,
  getUniversitiesByCourse,
  updateUniversity,
  deleteUniversity,
} from "../controller/universityTableController.js";

const router = express.Router();

// POST – Add a new university to a course
router.post("/add", addUniversity);

// GET – Get all courses and their universities
router.get("/all", getAllCourses);

// GET – Get universities for a specific course
router.get("/:courseName", getUniversitiesByCourse);

// PUT – Update a specific university
router.put("/:courseName/:universityId", updateUniversity);

// DELETE – Delete a specific university
router.delete("/:courseName/:universityId", deleteUniversity);

export default router;
