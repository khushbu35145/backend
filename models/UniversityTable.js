// // import mongoose from "mongoose";

// // const universitySchema = new mongoose.Schema({
// //   name: {
// //     type: String,
// //     required: true,
// //     trim: true,
// //   },
// //   course: {
// //     type: String,
// //     required: true,
// //     trim: true,
// //   },
// //   mode: {
// //     type: String,
// //     required: true,
// //     trim: true,
// //   },
// //   specialisation: {
// //     type: String,
// //     required: true,
// //   },
// //   eligibility: {
// //     type: String,
// //     required: true,
// //   },
// //   fees: {
// //     type: String, // keep as string so you can store ranges like "₹30,000 – ₹60,000 / year"
// //     required: true,
// //   },
   
// // }, { timestamps: true });

// // export default mongoose.model("UniversityTable", universitySchema);
// import mongoose from "mongoose";

// const universitySchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     course: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     mode: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     specialisation: {
//       type: String,
//       required: true,
//     },
//     eligibility: {
//       type: String,
//       required: true,
//     },
//     fees: {
//       type: String, // can store ranges like "₹30,000 – ₹60,000 / year"
//       required: true,
//     },
//     examFee: {
//       type: String,
//       required: true,
//     },
//     registrationFee: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("UniversityTable", universitySchema);
import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
  universityName: { type: String, required: true },
  specialisation: { type: String, required: true },
  mode: { type: String, required: true },
  eligibility: { type: String, required: true },
  fees: { type: String, required: true },
  examFee: { type: String, required: true },
  registrationFee: { type: String, required: true },
});

const collegeCourseSchema = new mongoose.Schema(
  {
    courseName: { type: String, required: true, unique: true },
    universities: [universitySchema],
  },
  { timestamps: true }
);

export default mongoose.model("collegeUniversity", universitySchema);
