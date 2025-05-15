import express from 'express';
import multer from 'multer';
import sendApplicantInfo from '../controller/IIBFForm.js';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

const fields = [
  { name: 'aadhaarCard', maxCount: 1 },
  { name: 'panCard', maxCount: 1 },
  { name: 'validAadhaarPan', maxCount: 1 },
  { name: 'photo', maxCount: 1 },
  { name: 'signature', maxCount: 1 },
  { name: 'qualificationDoc', maxCount: 1 },
  { name: 'casteCertificate', maxCount: 1 },
];

router.post('/IIBF', upload.fields(fields), sendApplicantInfo);

export default router;
