import Job from "../models/job.js";

// Add new job
export const createJob = async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    res.status(500).json({ error: "Failed to create job" });
  }
};

// Get all jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

// Update job
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json({ message: "Job updated successfully", job });
  } catch (error) {
    res.status(500).json({ error: "Failed to update job" });
  }
};

// Delete job
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete job" });
  }
};
