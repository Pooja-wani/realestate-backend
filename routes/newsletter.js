const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });
    const existing = await Subscriber.findOne({ email });
    if (existing) return res.json({ success: true, message: 'Already subscribed' });
    const s = new Subscriber({ email });
    await s.save();
    res.json({ success: true, subscriber: s });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const subs = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
