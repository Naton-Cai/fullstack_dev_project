// generate Claude to quickly test the MongoDB connection
const express = require('express');
const paintController = require('../controllers/paintController');

const router = express.Router();

// POST /paints -> validate, sanitize, and save one paint (handled by the controller)
router.post(
  '/',
  (req, res, next) => {
    console.log('testinsert hit:', req.body);
    next();
  },
  paintController.paint_create_post,
);

module.exports = router;
