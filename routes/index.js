const express = require('express');
const paintController = require('../controllers/paintController');

const router = express.Router();

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Collection' });
});

// Display the Add Paint form.
router.get('/paints/add', paintController.paint_create_get);

// Process the Add Paint form.
router.post('/paints/add', paintController.paint_create_post);

module.exports = router;
