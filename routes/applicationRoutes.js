import express from "express";
import { applyCollege } from "../controller/applicationController.js";

const router = express.Router();

// POST - Apply for college
router.post("/apply", applyCollege);

export default router;
