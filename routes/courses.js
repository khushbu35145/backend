import express from 'express'
import { checkout, fetchLecture, fetchLectures, getAllCourses, getMyCourses, getSingleCourse } from '../controller/courses.js';
import { isAdmin, isAuth } from '../middleware/auth.js';
import { getAllStats } from '../controller/admin.js';

const router=express.Router();
router.get('/course/all',getAllCourses)
router.get('/course/:id',getSingleCourse)
router.get('/lectures/:id',isAuth,fetchLectures)
router.get('/lectures/:id',isAuth,fetchLecture)
router.get('/stats',isAuth,isAdmin,getAllStats)
router.get('/mycourse',isAuth,getMyCourses)
router.post('/course/checkout/:id',isAuth,checkout)
export default router;