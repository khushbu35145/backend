import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/apply", async (req, res) => {
  const {
    orgName,
    address,
    website,
    contactName,
    designation,
    phone,
    email,
  } = req.body;

  try {
    // Transporter (Use your Gmail + App Password)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Replace with your Gmail
        pass: process.env.EMAIL_PASS, // Replace with App Password (not Gmail password!)
      },
    });

    // Email content
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // Where you want to receive submissions
      subject: "New Partnership Application",
      html: `
        <h2>New Partnership Application</h2>
        <p><strong>Organization:</strong> ${orgName}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Website:</strong> ${website}</p>
        <p><strong>Contact Name:</strong> ${contactName}</p>
        <p><strong>Designation:</strong> ${designation}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Application submitted!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Error submitting application" });
  }
});

export default router;
