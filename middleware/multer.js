
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads');
  },
  filename(req, file, cb) {
    const ext = file.originalname.split('.').pop();
    const filename = `${uuidv4()}.${ext}`;
    cb(null, filename);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
}).single('image'); // must match 'image' field from Postman

export const handleUpload = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      console.error("❌ Multer error:", err);
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

