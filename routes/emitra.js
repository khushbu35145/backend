// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import controller from '../controller/emitra.js';

// const router = express.Router();

// // File upload setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
// });
// const upload = multer({ storage });

// router.post(
//   '/emitra',
//   upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'document', maxCount: 1 }]),
//   controller.submitApplication
// );

// export default router;
import express from 'express';
import kioskController from '../controller/emitra.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Ensure uploads directory exists
const uploadPath = path.join('uploads');
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

const fileFields = [
  { name: 'policeVerificationPali', maxCount: 1 },
  { name: 'applicantPhoto', maxCount: 1 },
  { name: 'marksheet', maxCount: 1 },
  { name: 'aadharCopy', maxCount: 1 },
  { name: 'panCardCopy', maxCount: 1 },
  { name: 'rentAgreement', maxCount: 1 },
  {name:'rscit',maxCount:1},
  {name:'affidavit',maxCount:1},
  { name: 'policeVerificationOther', maxCount: 1 },
  { name: 'otherDocuments', maxCount: 1 }
];

router.post('/emitra', upload.fields(fileFields), kioskController.registerKiosk);

export default router;


