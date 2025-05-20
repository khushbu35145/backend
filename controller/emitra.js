// // // // import EmitraApplication from '../models/emitra.js';

// // // // const submitApplication = async (req, res) => {
// // // //   try {
// // // //     const { name, mobile, email, address, aadhar, service } = req.body;
// // // //     const photo = req.files?.photo?.[0]?.path || '';
// // // //     const document = req.files?.document?.[0]?.path || '';

// // // //     const application = new EmitraApplication({
// // // //       name, mobile, email, address, aadhar, service, photo, document,
// // // //     });

// // // //     await application.save();
// // // //     res.status(201).json({ message: 'Application submitted', application });
// // // //   } catch (error) {
// // // //     res.status(500).json({ error: error.message });
// // // //   }
// // // // };

// // // // export default { submitApplication };
// // // import EmitraApplication from '../models/emitra.js';
// // // import nodemailer from 'nodemailer';
// // // import fs from 'fs';

// // // const submitApplication = async (req, res) => {
// // //   try {
// // //     const { name, mobile, email, address, aadhar, service } = req.body;
// // //     const photo = req.files?.photo?.[0]?.path || '';
// // //     const document = req.files?.document?.[0]?.path || '';

// // //     const application = new EmitraApplication({
// // //       name, mobile, email, address, aadhar, service, photo, document,
// // //     });

// // //     await application.save();

// // //     // Send Email
// // //     const transporter = nodemailer.createTransport({
// // //       service: 'gmail',
// // //       auth: {
// // //         user: process.env.EMAIL_USER,
// // //         pass: process.env.EMAIL_PASS,
// // //       },
// // //     });

// // //     const mailOptions = {
// // //       from: email,
// // //       to: `"e-Mitra Form" <${process.env.EMAIL_USER}>`,
// // //       subject: `New e-Mitra Application from ${name}`,
// // //       text: `
// // // New e-Mitra Application:

// // // Name: ${name}
// // // Mobile: ${mobile}
// // // Email: ${email}
// // // Address: ${address}
// // // Aadhar: ${aadhar}
// // // Service: ${service}
// // //      `,
// // //       attachments: [
// // //         {
// // //           filename: photo.split('/').pop(),
// // //           path: photo,
// // //         },
// // //         {
// // //           filename: document.split('/').pop(),
// // //           path: document,
// // //         },
// // //       ],
// // //     };

// // //     await transporter.sendMail(mailOptions);

// // //     res.status(201).json({ message: 'Application submitted and email sent', application });
// // //   } catch (error) {
// // //     console.error('Error:', error);
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // };

// // // export default { submitApplication };
// // import EmitraApplication from '../models/emitra.js';
// // import nodemailer from 'nodemailer';
// // import fs from 'fs';

// // const submitApplication = async (req, res) => {
// //   try {
// //     const { name, mobile, email, address, aadhar, service } = req.body;

// //     // Extract all uploaded files
// //     const photo = req.files?.photo?.[0]?.path || '';

// //     const documents = {
// //       aadhaarCard: req.files?.aadhaarCard?.[0]?.path || '',
// //       panCard: req.files?.panCard?.[0]?.path || '',
// //       bankPassbook: req.files?.bankPassbook?.[0]?.path || '',
// //       janAadharCard: req.files?.janAadharCard?.[0]?.path || '',
// //       mobileProof: req.files?.mobileProof?.[0]?.path || '',
// //       tenthMarksheet: req.files?.tenthMarksheet?.[0]?.path || '',
// //       policeVerification: req.files?.policeVerification?.[0]?.path || '',
// //       kioskAddress: req.files?.kioskAddress?.[0]?.path || '',
// //       rscitCertificate: req.files?.rscitCertificate?.[0]?.path || '',
// //     };

// //     // Create a new application entry
// //     const application = new EmitraApplication({
// //       name,
// //       mobile,
// //       email,
// //       address,
// //       aadhar,
// //       service,
// //       photo,
// //       documents,
// //     });

// //     await application.save();

// //     // Prepare email
// //     const transporter = nodemailer.createTransport({
// //       service: 'gmail',
// //       auth: {
// //         user: process.env.EMAIL_USER,
// //         pass: process.env.EMAIL_PASS,
// //       },
// //     });

// //     const attachments = [
// //       photo && {
// //         filename: photo.split('/').pop(),
// //         path: photo,
// //       },
// //       ...Object.entries(documents).map(([key, path]) =>
// //         path
// //           ? {
// //               filename: path.split('/').pop(),
// //               path,
// //             }
// //           : null
// //       ),
// //     ].filter(Boolean); // Remove null entries

// //     const mailOptions = {
// //       from: email,
// //       to: `"e-Mitra Form" <${process.env.EMAIL_USER}>`,
// //       subject: `New e-Mitra Application from ${name}`,
// //       text: `
// // New e-Mitra Application:

// // Name: ${name}
// // Mobile: ${mobile}
// // Email: ${email}
// // Address: ${address}
// // Aadhar: ${aadhar}
// // Service: ${service}
// //       `,
// //       attachments,
// //     };

// //     await transporter.sendMail(mailOptions);

// //     res.status(201).json({ message: 'Application submitted and email sent', application });
// //   } catch (error) {
// //     console.error('Error:', error);
// //     res.status(500).json({ error: error.message });
// //   }
// // };

// // export default { submitApplication };
// import Kiosk from '../models/emitra.js';

// const registerKiosk = async (req, res) => {
//   try {
//     const {
//       name, fatherName, dob, permanentAddress, currentAddress, aadharNo, email, panNo,
//       janAadharNo, contactNumber, location, kioskName, ssoId, policeStation, kioskAddress,
//       tehsil, municipality, wardOrVillage, pincode, bankAccountNumber, ifsc, bankName, accountHolder,
//       correspondentBank, correspondentIfsc, odAccount, koCode
//     } = req.body;

//     const files = req.files;

//     const newKiosk = new Kiosk({
//       kioskOwner: {
//         name, fatherName, dob, permanentAddress, currentAddress, aadharNo, email, panNo,
//         janAadharNo, contactNumber
//       },
//       kioskCenter: {
//         location, name: kioskName, ssoId, policeStation, address: kioskAddress,
//         tehsil, municipality, wardOrVillage, pincode, bankAccountNumber, ifsc,
//         bankName, accountHolder
//       },
//       correspondentDetails: {
//         bankName: correspondentBank,
//         ifsc: correspondentIfsc,
//         odAccount,
//         koCode
//       },
//       documents: {
//         policeVerificationPali: files.policeVerificationPali?.[0]?.path,
//         applicantPhoto: files.applicantPhoto?.[0]?.path,
//         marksheet: files.marksheet?.[0]?.path,
//         aadharCopy: files.aadharCopy?.[0]?.path,
//         panCardCopy: files.panCardCopy?.[0]?.path,
//         rentAgreement: files.rentAgreement?.[0]?.path,
//         policeVerificationOther: files.policeVerificationOther?.[0]?.path,
//         otherDocuments: files.otherDocuments?.[0]?.path
//       }
//     });

//     await newKiosk.save();
//     res.status(201).json({ message: 'Kiosk registration successful' });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// };

// export default { registerKiosk };

import Kiosk from "../models/emitra.js";
import sendEmail from "../utils/sendMail.js";
import path from "path";
import fs from "fs";
const registerKiosk = async (req, res) => {
  try {
    const {
    
      name,
      fatherName,
      dob,
      permanentAddress,
      currentAddress,
      aadharNo,
      email,
      panNo,
      janAadharNo,
      contactNumber,
      location,
      kioskName,
      ssoId,
      policeStation,
      kioskAddress,
      tehsil,
      municipality,
      wardOrVillage,
      pincode,
      bankAccountNumber,
      ifsc,
      bankName,
      accountHolder,
      correspondentBank,
      correspondentIfsc,
      odAccount,
      koCode
    } = req.body;

    const documentPaths = {};

    const documentFields = [
      "policeVerificationPali",
      "applicantPhoto",
      "marksheet",
      "aadharCopy",
      "panCardCopy",
      "rscit",
      "affidavit",
      "rentAgreement",
      "policeVerificationOther",
      "otherDocuments",
    ];

    documentFields.forEach((field) => {
      if (req.files[field]) {
        documentPaths[field] = req.files[field][0].path;
      }
    });

    const newKiosk = await Kiosk.create({
      name,
      fatherName,
      dob,
      permanentAddress,
      currentAddress,
      aadharNo,
      email,
      panNo,
      janAadharNo,
      contactNumber,
      location,
      kioskName,
      ssoId,
      policeStation,
      kioskAddress,
      tehsil,
      municipality,
      wardOrVillage,
      pincode,
      bankAccountNumber,
      ifsc,
      bankName,
      accountHolder,
      correspondentBank,
      correspondentIfsc,
      odAccount,
      koCode,
      documents: documentPaths,
    });

    // Compose Email
    const message = `
📌 New E-Mitra Kiosk Registration:

👤 Personal Info:
- Name: ${name}
- Father's Name: ${fatherName}
- DOB: ${dob}
- Aadhar No: ${aadharNo}
- PAN No: ${panNo}
- Jan Aadhar No: ${janAadharNo}
- Email: ${email}
- Contact: ${contactNumber}




📍 Address:
- Permanent: ${permanentAddress}
- Current: ${currentAddress}
- Location: ${location}

🏢 Kiosk Details:
- Name: ${kioskName}
- SSO ID: ${ssoId}
- Police Station: ${policeStation}
- Address: ${kioskAddress}
- Tehsil: ${tehsil}
- Municipality/GP: ${municipality}
- Ward/Village: ${wardOrVillage}
- Pincode: ${pincode}

🏦 Bank Details:
- A/C No: ${bankAccountNumber}
- IFSC: ${ifsc}
- Bank Name: ${bankName}
- Account Holder: ${accountHolder}

💼Bank Correspondent (BC) Info:
- Bank: ${correspondentBank}
- IFSC: ${correspondentIfsc}
- OD Account: ${odAccount}
- KO Code: ${koCode}
`;
const attachments = [];

documentFields.forEach((field) => {
  if (req.files[field]) {
    const file = req.files[field][0];
    documentPaths[field] = file.path;

    attachments.push({
      filename: file.originalname,
      path: file.path,
    });
  }
});

    await sendEmail("New Kiosk Registration Submitted", message, process.env.EMAIL_USER,attachments);

    res.status(201).json({ success: true, message: "Kiosk registered successfully & email sent!" });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
};

export default {
  registerKiosk,
};


