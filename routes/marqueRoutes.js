import express from 'express'
import Marquee from '../models/Marquee.js'
const router = express.Router();
router.get('/marquee', async (req, res) => {
  try {
    const messages = await Marquee.find({ isDeleted: false }).sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch marquee messages.' });
  }
});
// POST new marquee message (Admin only - optional auth middleware)
router.post('/marquee', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const newMsg = new Marquee({ message });
    await newMsg.save();
    res.status(201).json({ message: "Marquee message updated successfully!" });
  } catch (err) {
    console.error("Error posting marquee:", err);
    res.status(400).json({ error: "Failed to save marquee message." });
  }
});
// DELETE latest marquee
router.delete('/marquee/:id', async (req, res) => {
  try {
    const latest = await Marquee.findOne().sort({ updatedAt: -1 });
    if (!latest) {
      return res.status(404).json({ message: 'No marquee message to delete.' });
    }

    await Marquee.findByIdAndDelete(latest._id);
    res.status(200).json({ message: 'Latest marquee message deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete marquee message.' });
  }
});
export default router;
