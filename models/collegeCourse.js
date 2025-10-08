
// import mongoose from "mongoose";
// const universitySchema = new mongoose.Schema({
//   universityName: { type: String, required: true },
//   specialisation: { type: String },
//   mode: { type: String },
//   eligibility: { type: String },
//   fees: { type: Number }
// });

// const courseSchema = new mongoose.Schema({
//   courseName: { type: String, required: true, unique: true },
//   universities: [universitySchema]
// });

// export default mongoose.model("collegeCourse", courseSchema);
import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
  universityName: { type: String, required: true },
  specialisation: { type: String },
  mode: { type: String },
  eligibility: { type: String },
  fees: { type: Number },
  examFee: { type: Number, required: true },
  registrationFee: { type: Number, required: true },
});

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true, unique: true },
  universities: [universitySchema],
});

export default mongoose.model("collegeCourse", courseSchema);
