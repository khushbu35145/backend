// import express from 'express';
// import mongoose from 'mongoose'
// const app = express();

// const dbConnection = async () => {
//     try {
//         await mongoose.connect("mongodb+srv://khushbukashyap:khushbu35145@cluster1.vttjf.mongodb.net/jce_database?retryWrites=true&w=majority&appName=Cluster1");
//         console.log("✅ MongoDB Connected Successfully");
//     } catch (error) {
//         console.error("❌ MongoDB Connection Failed:", error);
//         process.exit(1); // Stop the server if DB connection fails
//     }
// };

// dbConnection();
// // importing routes
// import userRoutes from './routes/user.js'
// app.use('/api', userRoutes)


// app.listen(4000, () => {
//     console.log("Server is Running on port 4000");
// });
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import coursesRoutes from './routes/courses.js'
import adminRoutes from './routes/admin.js'
import RazorPay from 'razorpay'

// Load environment variables
dotenv.config();
 export const instance=new RazorPay({
    key_id:process.env.RAZORPAY_KEY,
    key_secret:process.env.RAZORPAY_SECRET,
})


const app = express();
app.use(express.json()); // Allows JSON data in requests
app.use(cors()); // Enables CORS for frontend access

// MongoDB Connection
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
        process.exit(1); // Stop the server if DB connection fails
    }
};
dbConnection();

// Import Routes
import userRoutes from './routes/user.js';
app.use('/api', userRoutes);
app.use('/api',coursesRoutes);
app.use('/api',adminRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server is Running on port ${PORT}`);
});
