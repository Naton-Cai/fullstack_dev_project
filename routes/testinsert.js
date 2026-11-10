// generate Claude to quickly test the MongoDB connection
const express = require('express');
const Color = require('../model/paint');

const router = express.Router();

// POST /paints  -> saves one paint
router.post('/', async (req, res) => {
  try {
    const saved = await Color.create(req.body);
    res.status(201).json(saved);
  } catch (err) {
    // Validation errors (bad hex, percentages not summing to 100, etc.)
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
