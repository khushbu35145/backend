import nodemailer from 'nodemailer';

const submitApplication = async (req, res) => {
  try {
    const {
      name,
      email,
      contact,
      motherName,
      fatherName,
      nomineeName,
      nomineeDob,
      nomineeRelation,
    } = req.body;

    const files = req.files;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,         // ⬅️ Your email
        pass: process.env.EMAIL_PASS,            // ⬅️ Your app password
      },
    });

    const attachments = Object.keys(files).map((key) => ({
      filename: files[key][0].originalname,
      path: files[key][0].path,
    }));

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: 'New CSC Application Submitted',
      text: `
A new CSC application has been submitted.

NAME:${name}
Email: ${email}
Contact:${contact}
Mother Name: ${motherName}
Father Name: ${fatherName}

Nominee Name: ${nomineeName}
Nominee DOB: ${nomineeDob}
Nominee Relation: ${nomineeRelation}
      `,
      attachments,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Application submitted and emailed successfully.' });
  } catch (error) {
    console.error('Email send error:', error);
    res.status(500).json({ error: 'Failed to send email.' });
  }
};

export default { submitApplication };
