import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    experience: { type: String, required: true },
    qualification: { type: String, required: true },
    salary: { type: String, required: true },
    candidate: { type: String, required: true },
    post: { type: String, required: true },
    type: { type: String, enum: ["Full-Time", "Part-Time", "Internship"], required: true },
    applyLink: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
