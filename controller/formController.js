import nodemailer from 'nodemailer';

const sendAdmissionForm = async (req, res) => {
  const form = req.body;
  const files = req.files;

  const attachments = Object.keys(files || {}).map((key) => {
    const file = files[key][0];
    return {
      filename: file.originalname,
      content: file.buffer,
      contentType: file.mimetype,
    };
  });

  const htmlBody = `
    <h2>New NIELIT Admission Form</h2>
    <ul>
      <li><strong>Name:</strong> ${form.name}</li>
      <li><strong>Father's Name:</strong> ${form.fatherName}</li>
      <li><strong>Mobile:</strong> ${form.mobile}</li>
      <li><strong>Email:</strong> ${form.email}</li>
      <li><strong>DOB:</strong> ${form.dob}</li>
      <li><strong>Caste Category:</strong> ${form.casteCategory}</li>
      <li><strong>Selected Course:</strong> ${form.neilitCourse}</li>
    </ul>
  `;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from:  form.email,
      to:`"NIELIT Portal" <${process.env.EMAIL_USER}>`,
      subject: 'New NIELIT Admission Form Submission',
      html: htmlBody,
      attachments,
    });

    res.status(200).json({ message: 'Form sent successfully to email!' });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ message: 'Failed to send form', error: err });
  }
};

export default sendAdmissionForm;
