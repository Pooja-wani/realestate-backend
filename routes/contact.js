const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/add', async (req, res) => {
  try {
    const c = new Contact(req.body);
    await c.save();
    res.json({ success: true, contact: c });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
