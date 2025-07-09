import mongoose from 'mongoose';

const marqueeSchema = new mongoose.Schema({
  message: { type: String, required: true },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

const Marquee = mongoose.model('Marquee', marqueeSchema);
export default Marquee;

