import sendMail from "../middleware/sendMail.js";
import { User } from "../models/user.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import tryCatch from "../tryCatch.js";

export const register = async (req, res) => {
    try {
        const {email,name,password}=req.body
        let user=await User.findOne({email})
        if(user) return res.status(400).json({
            message:'User Already exists'
        })
        user={
            name,
            email,
            password,
        }
        const otp=Math.floor(Math.random()* 1000000)
        const activationToken=jwt.sign({
            user,
            otp,
        } ,process.env.Activation_Secret,{
            expiresIn:'5m'
        });
        const data={
            name,
            otp,
        };
        await sendMail(
            email,
            "Jeet E-learning",
            data
        )
        res.status(200).json({
            message:'Otp send to your mail',
            activationToken,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
// export const verifyUser=tryCatch(async(req,res)=>{
//     const {otp,activationToken}=req.body
//     const verify=jwt.verify(activationToken,process.env.Activation_Secret)
//     if(!verify)
//         return res.status(400).json({
//         message:'otp Expired',
//         })
//    if(verify.otp!=otp)
//     return res.status(400).json({
//         message:'Wrong otp',
//     });
//     await User.create(
//         {
//             name:verify.user.name,
//             email:verify.user.email,
//             password:verify.user.password
//         }
//     )
//     res.json({
//         message:"User Register"
//     })
// });
// export const verifyUser = tryCatch(async (req, res) => {
//     const { otp, activationToken } = req.body;
//     const verify = jwt.verify(activationToken, process.env.Activation_Secret);

//     if (!verify)
//         return res.status(400).json({ message: 'OTP Expired' });

//     if (verify.otp !== otp)
//         return res.status(400).json({ message: 'Wrong OTP' });

//     // ✅ Hash the password before saving
//     const hashedPassword = await bcrypt.hash(verify.user.password, 10);

//     await User.create({
//         name: verify.user.name,
//         email: verify.user.email,
//         password: hashedPassword  // ✅ Now stored as a hashed password
//     });

//     res.json({ message: "User Registered" });
// });
export const verifyUser = tryCatch(async (req, res) => {
    const { otp, activationToken } = req.body;
  
    let verify;
    try {
      verify = jwt.verify(activationToken, process.env.Activation_Secret);
    } catch (err) {
      return res.status(400).json({ message: 'OTP Expired or Invalid' });
    }
  
    if (String(verify.otp) !== String(otp)) {
      return res.status(400).json({ message: 'Wrong OTP' });
    }
  
    const hashedPassword = await bcrypt.hash(verify.user.password, 10);
  
    await User.create({
      name: verify.user.name,
      email: verify.user.email,
      password: hashedPassword
    });
  
    res.json({ message: "User Registered" });
  });
  




// export const loginUser = tryCatch(async(req,res)=>{
//     const {email, password}=req.body
//     const user=await User.findOne({email})
//     console.log(password)
//     console.log(user.password)
//     console.log("Stored Hashed Password in DB:", user.password);

//     if(!user) res.status(400).json({
//         message:"No User With This Email"
//     })
//     const matchPassword=await bcrypt.compare(password,user.password)
//     console.log("password Match Result",matchPassword)

//     if(!matchPassword)
//         return res.status(400).json({
//         message:"Wrong Password",
//     });
//     const token= jwt.sign({_id:user._id},process.env.Jwt_Sec,{
//     expiresIn:"15d",
//     });
//     res.json({
//         message:`Welcome back${user.name}`,
//         token,
//         user,
//     })
// });
export const loginUser = tryCatch(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "No User With This Email" });
    }

    console.log("Entered Password:", password);
    console.log("Stored Hashed Password in DB:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Do they match?", isMatch);  // Should print: true
    

    if (!isMatch) {
        return res.status(400).json({ message: "Wrong Password" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    res.json({
        message: `Welcome back ${user.name}`,
        token,
        user,
    });
});

export const myProfile=tryCatch(async(req,res)=>{
    const user=await User.findById(req.user._id);
    res.json({user})
})


export const resendOtp = tryCatch(async (req, res) => {
  const { activationToken } = req.body;

  if (!activationToken)
    return res.status(400).json({ message: "Token not provided" });

  let decoded;
  try {
    decoded = jwt.verify(activationToken, process.env.Activation_Secret);
  } catch (err) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  const newOtp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

  const newToken = jwt.sign(
    {
      user: decoded.user,
      otp: newOtp,
    },
    process.env.Activation_Secret,
    { expiresIn: "5m" }
  );

  const data = {
    name: decoded.user.name,
    otp: newOtp,
  };

  await sendMail(decoded.user.email, "Jeet E-learning - OTP", data);

  res.status(200).json({
    message: "OTP resent to your email",
    activationToken: newToken, // Send back new token
  });
});
// Add this in controller/user.js
export const getAllUsers = tryCatch(async (req, res) => {
  const adminUser = await User.findById(req.user._id);
  if (!adminUser || adminUser.role !== 'admin') {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  const users = await User.find().sort({ createdAt: -1 });
  res.json({ users });
});


