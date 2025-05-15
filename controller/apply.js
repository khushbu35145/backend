// import {Apply } from '../models/apply.js'
// import nodemailer from "nodemailer";
// import applicationValidationSchema from "../validators/applicationSchema.js";

//  export const submitApplication = async (req, res) => {
//   try {
//     const { error } = applicationValidationSchema.validate(req.body);
//     if (error) {
//       return res.status(400).json({ message: error.details[0].message });
//     }

//     const newApplication = new Apply(req.body);
//     await newApplication.save();

//     res.status(200).json({ message: "Application submitted successfully." });
//   } catch (err) {
//     console.error("Error saving application:", err);
//     res.status(500).json({ message: "Server error. Please try again later." });
//   }
// };
import nodemailer from "nodemailer";
import { Apply } from '../models/apply.js';
import applicationValidationSchema from "../validators/applicationSchema.js";
import dotenv from 'dotenv'
dotenv.config()

// Setup your mail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or use another SMTP provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // use an app password, not your Gmail password
  },
});

export const submitApplication = async (req, res) => {
  try {
    const { error } = applicationValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const newApplication = new Apply(req.body);
    await newApplication.save();
    const email=req.body.email

    // Compose email
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // or another email you want to receive applications at
      subject: 'New Application Received',
      html: `
        <h3>New Applicant Information</h3>
        <p><strong>Name:</strong> ${req.body.name}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Phone:</strong> ${req.body.phone}</p>
        <p><strong>Department:</strong> ${req.body.department}</p>
        <p><strong>Course:</strong> ${req.body.course}</p>
        <p><strong>Consent:</strong> ${req.body.consent ? 'Yes' : 'No'}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Application submitted and email sent successfully." });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

