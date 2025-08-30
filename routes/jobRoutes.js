import express from "express";
import { createJob, getJobs, updateJob, deleteJob } from "../controller/jobController.js";

const router = express.Router();

router.post("/", createJob);   // Add job
router.get("/", getJobs);      // Get all jobs
router.put("/:id", updateJob); // Update job
router.delete("/:id", deleteJob); // Delete job

export default router;
