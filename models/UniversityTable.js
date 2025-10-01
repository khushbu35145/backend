import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  course: {
    type: String,
    required: true,
    trim: true,
  },
  mode: {
    type: String,
    required: true,
    trim: true,
  },
  specialisation: {
    type: String,
    required: true,
  },
  eligibility: {
    type: String,
    required: true,
  },
  fees: {
    type: String, // keep as string so you can store ranges like "₹30,000 – ₹60,000 / year"
    required: true,
  },
   examFee: {
    type: String,
    required: true,
  },
  regFee: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export default mongoose.model("UniversityTable", universitySchema);