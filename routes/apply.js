import express from "express";
 const router = express.Router();
import { submitApplication } from '../controller/apply.js';

router.post("/apply", submitApplication);

export default router;

