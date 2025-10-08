import express from "express";
import multer from "multer";
import XLSX from "xlsx";
import Student from "../models/student.js";

const router = express.Router();

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// 📥 Route: Upload Excel and Save to MongoDB
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;

    // Read Excel file
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Save data to MongoDB
    await Student.insertMany(sheetData);

    res.status(200).json({ message: "Data imported successfully!", data: sheetData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error importing data", error });
  }
});

export default router;
