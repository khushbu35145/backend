
import mongoose from "mongoose";

const UniversitySchema = new mongoose.Schema(
  {
    universityName: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String, // Cloudinary URL
    },
    mode: {
      type: String,
      enum: ["Online", "Distance", "Regular", "Private"],
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("University", UniversitySchema);


