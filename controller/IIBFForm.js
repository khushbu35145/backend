import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const sendApplicantInfo = async (req, res) => {
  try {
    const {
      applicantName,
      email,
      mobile,
      motherName,
      fatherName
    } = req.body;

    const attachments = Object.values(req.files).map(fileArray => {
      const file = fileArray[0];
      return {
        filename: file.originalname,
        path: file.path,
      };
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER, // Replace with your actual email
      subject: 'New IIBF Applicant Submission',
      text: `
New CSC Applicant Submission:

Name: ${applicantName}
Email:${email}
Mobile: ${mobile}
Mother's Name: ${motherName}
Father's Name: ${fatherName}
      `,
      attachments,
    };

    await transporter.sendMail(mailOptions);

    // Cleanup uploaded files
    attachments.forEach(file => fs.unlinkSync(file.path));

    res.status(200).json({ message: 'Application submitted and emailed successfully.' });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ error: 'Failed to send application email.' });
  }
};

export default sendApplicantInfo;
