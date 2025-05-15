import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  department: { type: String, required: true },
  course: { type: String, required: true },
  consent: { type: Boolean, required: true },
  submittedAt: { type: Date, default: Date.now },
});

export const  Apply = mongoose.model("Applicants",schema);
