import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendApplicationEmail = async (req, res) => {
  try {
    const { name, email, phone, department, course, consent } = req.body;

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: "New Course Application - Jeet Computer Education",
      html: `
        <h2>New Application Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Department:</strong> ${department}</p>
        <p><strong>Course:</strong> ${course}</p>
        <p><strong>Consent Given:</strong> ${consent ? "Yes" : "No"}</p>
      `,
    };

    // Send mail
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Application submitted successfully! We'll contact you soon." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send application. Please try again." });
  }
};
