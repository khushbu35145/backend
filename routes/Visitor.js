// routes/visitor.js
import express from 'express';
import Visitor from '../models/Visitor.js';

const router = express.Router();

router.get('/visitor', async (req, res) => {
  let visitor = await Visitor.findOne();
  if (!visitor) {
    visitor = new Visitor({ count: 1 });
  } else {
    visitor.count += 1;
  }
  await visitor.save();
  res.json({ count: visitor.count });
});

export default router;
