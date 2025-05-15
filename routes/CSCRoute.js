import express from 'express';
import upload from '../middleware/upload.js';
import cscController from '../controller/CSCForm.js';

const router = express.Router();

const fileFields = [
  { name: 'bankPassbook', maxCount: 1 },
  { name: 'photo', maxCount: 1 },
  { name: 'voterId', maxCount: 1 },
  { name: 'marksheet', maxCount: 1 },
  { name: 'adharCard', maxCount: 1 },
  { name: 'panCard', maxCount: 1 },
  { name: 'tecCertificate', maxCount: 1 },
  { name: 'iibfCertificate', maxCount: 1 },
];

router.post('/CSC', upload.fields(fileFields), cscController.submitApplication);

export default router;
