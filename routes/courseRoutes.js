import express from 'express';
import { getAllCourses, createCourse, getCourseById } from '../controller/courseController.js';

const router = express.Router();

router.get('/course/all', getAllCourses);
router.post('/course/create', createCourse);
router.get('/course/:id', getCourseById);

export default router;
