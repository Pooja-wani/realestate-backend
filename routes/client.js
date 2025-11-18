const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const { upload, cropTo450x350, uploadDir } = require('../middleware/upload');
const path = require('path');

router.post('/add', upload.single('image'), async (req, res) => {
  try {
    let filename = null;
    if (req.file) {
      const cropped = await cropTo450x350(path.join(uploadDir, req.file.filename));
      filename = `/uploads/${cropped}`;
    }
    const c = new Client({
      name: req.body.name,
      designation: req.body.designation,
      review: req.body.review,
      imageUrl: filename
    });
    await c.save();
    res.json({ success: true, client: c });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
