import express from 'express';
import multer from 'multer';
import sendAdmissionForm from '../controller/formController.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadFields = upload.fields([
  { name: 'photo' },
  { name: 'signature' },
  { name: 'aadhar' },
  { name: 'tenthMarksheet' },
  { name: 'Leftthumbimpression' },
  { name: 'apaarID' },
]);

router.post('/submit', uploadFields, sendAdmissionForm);

export default router;
