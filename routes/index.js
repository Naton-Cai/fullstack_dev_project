const express = require('express');
const paintController = require('../controllers/paintController');

const router = express.Router();

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.get('/', (req, res) => {
  res.redirect('/paints');
});

// Display the Add Paint form.
router.get('/paints/add', paintController.paint_create_get);

// Process the Add Paint form.
router.post('/paints/add', paintController.paint_create_post);

// GET: Display the Mixer page.
router.get('/paints/mixer', (req, res) => {
  res.render('mixer', { title: 'Paint Mixer' });
});

router.post('/paints/mixer', paintController.paint_create_post);

router.get('/paints', paintController.paint_list);

router.get('/paints/:id', paintController.paint_detail);

router.get('/paints/:id/delete', paintController.paint_delete_get);

router.post('/paints/:id/delete', paintController.paint_delete_post);

module.exports = router;
