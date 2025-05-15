import nodemailer from "nodemailer";

const sendEmail = async (subject, message, toEmail, attachments = []) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user:process.env.EMAIL_USER , // Replace with your email
      pass:process.env.EMAIL_PASS ,   // Replace with App Password
    },
  });

  const mailOptions = {
    from:process.env.EMAIL_PASS, // Replace with your email
    to: toEmail,
    subject,
    text: message,
    attachments,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
