
// // import mongoose from 'mongoose';

// // const kioskSchema = new mongoose.Schema({
// //   kioskOwner: {
// //     name: String,
// //     fatherName: String,
// //     dob: Date,
// //     permanentAddress: String,
// //     currentAddress: String,
// //     aadharNo: String,
// //     email: String,
// //     panNo: String,
// //     janAadharNo: String,
// //     contactNumber: String,
// //   },
// //   kioskCenter: {
// //     location: String,
// //     name: String,
// //     ssoId: String,
// //     policeStation: String,
// //     address: String,
// //     tehsil: String,
// //     municipality: String,
// //     wardOrVillage: String,
// //     pincode: String,
// //     bankAccountNumber: String,
// //     ifsc: String,
// //     bankName: String,
// //     accountHolder: String,
// //   },
// //   correspondentDetails: {
// //     bankName: String,
// //     ifsc: String,
// //     odAccount: String,
// //     koCode: String,
// //   },
// //   documents: {
// //     policeVerificationPali: String,
// //     applicantPhoto: String,
// //     marksheet: String,
// //     aadharCopy: String,
// //     panCardCopy: String,
// //     rentAgreement: String,
// //     policeVerificationOther: String,
// //     otherDocuments: String,
// //   },
// //   createdAt: {
// //     type: Date,
// //     default: Date.now,
// //   }
// // });

// // const Kiosk = mongoose.model('Kiosk', kioskSchema);
// // export default Kiosk;
// import mongoose from 'mongoose';

// const kioskSchema = new mongoose.Schema({

//   kioskOwner: {
//     name: String,
//     fatherName: String,
//     dob: Date,
//     permanentAddress: String,
//     currentAddress: String,
//     aadharNo: String,
//     email: String,
//     panNo: String,
//     janAadharNo: String,
//     contactNumber: String,
//   },
//   kioskCenter: {
//     location: String,
//     name: String,
//     ssoId: String,
//     policeStation: String,
//     address: String,
//     tehsil: String,
//     municipality: String,
//     wardOrVillage: String,
//     pincode: String,
//     bankAccountNumber: String,
//     ifsc: String,
//     bankName: String,
//     accountHolder: String,
//   },
//   correspondentDetails: {
//     bankName: String,
//     ifsc: String,
//     odAccount: String,
//     koCode: String,
//   },
//   documents: {
//     policeVerificationPali: String,
//     applicantPhoto: String,
//     marksheet: String,
//     aadharCopy: String,
//     panCardCopy: String,
//     rentAgreement: String,
//     policeVerificationOther: String,
//     otherDocuments: String,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   }
// });

// const Kiosk = mongoose.model('Kiosk', kioskSchema);
// export default Kiosk;
import mongoose from 'mongoose';

const kioskSchema = new mongoose.Schema({
  kioskOwner: {
    name: String,
    fatherName: String,
    dob: Date,
    permanentAddress: String,
    currentAddress: String,
    aadharNo: String,
    email: String,
    panNo: String,
    janAadharNo: String,
    contactNumber: String,
  },
  kioskCenter: {
    location: String,
    name: String,
    ssoId: String,
    policeStation: String,
    address: String,
    tehsil: String,
    municipality: String,
    wardOrVillage: String,
    pincode: String,
    bankAccountNumber: String,
    ifsc: String,
    bankName: String,
    accountHolder: String,
  },
  correspondentDetails: {
    bankName: String,
    ifsc: String,
    odAccount: String,
    koCode: String,
  },
  documents: {
    policeVerificationPali: String,
    applicantPhoto: String,
    marksheet: String,
    aadharCopy: String,
    panCardCopy: String,
    rentAgreement: String,
    rscit:String,
    affidavit:String,
    policeVerificationOther: String,
    otherDocuments: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Kiosk = mongoose.model('Kiosk', kioskSchema);
export default Kiosk;


