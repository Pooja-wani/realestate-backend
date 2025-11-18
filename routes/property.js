const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const { upload, cropTo450x350, uploadDir } = require('../middleware/upload');
const path = require('path');

router.post('/add', upload.single('image'), async (req, res) => {
  try {
    let filename = null;
    if (req.file) {
      // crop
      const cropped = await cropTo450x350(path.join(uploadDir, req.file.filename));
      filename = `/uploads/${cropped}`;
    }
    const p = new Property({
      title: req.body.title,
      description: req.body.description,
      imageUrl: filename
    });
    await p.save();
    res.json({ success: true, property: p });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
