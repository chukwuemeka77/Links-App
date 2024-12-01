// routes/links.js
const express = require('express');
const Link = require('../models/Link');
const router = express.Router();

// Create a new link
router.post('/', async (req, res) => {
  try {
    const { userId, title, url, order } = req.body;
    const link = new Link({ userId, title, url, order });
    await link.save();
    res.status(201).json(link);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all links for a user
router.get('/:userId', async (req, res) => {
  try {
    const links = await Link.find({ userId: req.params.userId }).sort('order');
    res.json(links);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a link
router.put('/:id', async (req, res) => {
  try {
    const link = await Link.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(link);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a link
router.delete('/:id', async (req, res) => {
  try {
    await Link.findByIdAndDelete(req.params.id);
    res.json({ message: 'Link deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
