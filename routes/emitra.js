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

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

const fileFields = [
  { name: 'policeVerificationPali' },
  { name: 'applicantPhoto' },
  { name: 'marksheet' },
  { name: 'aadharCopy' },
  { name: 'panCardCopy' },
  { name: 'rentAgreement' },
  { name: 'policeVerificationOther' },
  { name: 'otherDocuments' }
];

router.post('/emitra', upload.fields(fileFields), kioskController.registerKiosk);

export default router;

