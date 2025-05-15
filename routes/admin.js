import express from 'express'
import { isAdmin, isAuth } from '../middleware/auth.js';
import { addLecture,createCourse,  deleteCourse, deleteLecture } from '../controller/admin.js';
import { handleUpload} from '../middleware/multer.js';

const router=express.Router();
router.post('/courses/new',
    (req, res, next) => { console.log("✅ Route hit"); next(); },
    handleUpload,
    (req, res, next) => { console.log("📦 File middleware done"); next(); },
    createCourse
  );
  
router.post('/course/:id',handleUpload,addLecture)
router.delete('/lecture/:id',deleteLecture)
router.delete('/course/:id',deleteCourse)
export default router;