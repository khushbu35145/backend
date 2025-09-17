// // import express from "express";
// // import {
// //   getUniversities,
// //   addUniversity,
// //   updateUniversity,
// //   deleteUniversity,
// // } from "../controller/universityController.js";

// // const router = express.Router();

// // router.get("/", getUniversities);
// // router.post("/", addUniversity);
// // router.put("/:id", updateUniversity);
// // router.delete("/:id", deleteUniversity);

// // export default router;
// // routes/universityRoutes.js
// import express from "express";
// import multer from "multer";
// import { createUniversity, getUniversities, deleteUniversity } from "../controller/universityController.js";

// const router = express.Router();

// // Multer setup for logo uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/universities");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage });

// // Routes
// router.post("/", upload.single("logo"), createUniversity);
// router.get("/", getUniversities);
// router.delete("/:id", deleteUniversity);

// export default router;
// routes/universityRoutes.js
import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path"
import { createUniversity, getUniversities, deleteUniversity } from "../controller/universityController.js";


const router = express.Router();

const uploadDir = "uploads/universities";

// Ensure uploads/universities folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.post("/universities", upload.single("logo"), createUniversity);
router.get("/universities", getUniversities);
router.delete("/universities/:id", deleteUniversity);

export default router;

