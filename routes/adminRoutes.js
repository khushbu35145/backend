import express from 'express';
import Admin from '../models/admin.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import auth from '../middleware/adminAuth.js';

const router = express.Router();

// Register admin (use once)
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = new Admin({ email, password });
    await admin.save();
    res.json({ message: 'Admin created' });
  } catch (err) {
    res.status(400).json({ error: 'Admin already exists or error occurred' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(400).json({ error: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
});

// Dashboard (protected route)
router.get('/dashboard', auth, (req, res) => {
  res.json({ message: 'Welcome to Admin Dashboard' });
});

export default router;

