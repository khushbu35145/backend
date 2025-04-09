import express from 'express'
import { isAdmin, isAuth } from '../middleware/auth.js';
import { addLecture, createCourse, deleteCourse, deleteLecture } from '../controller/admin.js';
import { uploadFiles } from '../middleware/multer.js';

const router=express.Router();
router.post('/courses/new',uploadFiles,isAuth,isAdmin ,uploadFiles,createCourse)
router.post('/course/:id',isAuth,isAdmin,uploadFiles,addLecture)
router.delete('/lecture/:id',isAuth,isAdmin,deleteLecture)
router.delete('/lecture/:id',isAuth,isAdmin,deleteCourse)
export default router;