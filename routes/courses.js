import express from 'express'
import {  fetchLectures, getAllCourses, getMyCourses, getSingleCourse } from '../controller/courses.js';
import { isAdmin, isAuth } from '../middleware/auth.js';
import { getAllStats } from '../controller/admin.js';

const router=express.Router();
router.get('/course/all',getAllCourses)
router.get('/course/:id',getSingleCourse)
router.get('/lectures/:id',fetchLectures)
router.get('/stats',getAllStats)
router.get('/mycourse',getMyCourses)
// router.post('/api/course/checkout/:id', isAuth, checkout);
// router.post('/api/veification/:id', isAuth, paymentVerification);


export default router;